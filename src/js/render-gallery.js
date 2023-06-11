import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
import refs from "./refs";
import ImagesApi from "./images-api";

const lightbox = new SimpleLightbox('.photo-card');

export default function renderGallery(imagesData) {
    const markup = imagesData.map(img => `
    <div href="${img.largeImageURL}" class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes: </b></br>${img.likes}
            </p>
            <p class="info-item">
            <b>Views: </b></br>${img.views}
            </p>
            <p class="info-item">
            <b>Comments: </b></br>${img.comments}
            </p>
            <p class="info-item">
            <b>Downloads: </b></br>${img.downloads}
            </p>
        </div>
</div>
    `).join('')
    refs.resultContainer.insertAdjacentHTML('beforeend', markup)
    lightbox.refresh();
}
