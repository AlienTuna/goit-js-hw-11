import Notiflix from "notiflix";
// import Axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
import ImagesApi from "./js/images-api";

// const axios = require('axios').default;

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    moreButton: document.querySelector('.more-button'),
    resultContainer: document.querySelector('div.js-result-container'),
}

const imgApi = new ImagesApi();
const lightbox = new SimpleLightbox('.photo-card');
Notiflix.Notify.init({
    width: '380px',
    borderRadius: '2px',
    clickToClose: true,
    opacity: 0.8,
    fontSize: '18px',
    warning: {
        background: '#cf9f02',
        textColor: '#000',
      },
    failure: {
        background: '#da5f52',
        textColor: '#000',
      },
})

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.moreButton.addEventListener('click', onLoadMore);

refs.moreButton.classList.add('hidden');

async function onSearchSubmit(e) {
    e.preventDefault();
    
    refs.moreButton.classList.add('hidden');

    clearGallery();
    imgApi.resetPage();
    imgApi.query = e.currentTarget.elements.searchQuery.value;
    try {
        const resultJson = await imgApi.fetchImages()
        if (resultJson.length < 1) {
            Notiflix.Notify.warning("Oops! There are no images matching your search query.")
            
            return
        }
        renderGallery(resultJson)
        refs.moreButton.classList.remove('hidden');
    } catch {
        Notiflix.Notify.failure("Something went wrong. Try to reload the page.")
        
        return
    }

}

async function onLoadMore() {
    const resultJson = await imgApi.fetchImages()
    renderGallery(resultJson);

}

function renderGallery(imagesData) {
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

function clearGallery() {
    refs.resultContainer.innerHTML = '';
}