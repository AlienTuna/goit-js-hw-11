import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
import ImagesApi from "./js/images-api";


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    moreButton: document.querySelector('.more-button'),
    resultContainer: document.querySelector('div.js-result-container'),
}

const imgApi = new ImagesApi();
const lightbox = new SimpleLightbox('.photo-card');
Notiflix.Notify.init({
    width: '100%',
    position: 'center-center',
    borderRadius: '2px',
    clickToClose: true,
    opacity: 0.95,
    fontSize: '20px',
    warning: {
        background: '#cf9f02',
        textColor: '#000',
      },
    failure: {
        background: '#da5f52',
        textColor: '#000',
      },
    success: {
        background: '#225469',
        textColor: '#c7b75b',
      },
})

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.moreButton.addEventListener('click', onLoadMore);

refs.moreButton.classList.add('hidden');

async function onSearchSubmit(e) {
    e.preventDefault();
    
    disableMoreBtn();

    clearGallery();
    imgApi.resetPage();
    imgApi.query = e.currentTarget.elements.searchQuery.value;
    try {
        const resultJson = await imgApi.fetchImages()
        if (resultJson.length < 1) {
            Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
            return
        }
        renderGallery(resultJson);
        enableMoreBtn();
        Notiflix.Notify.success(`Hooray! We found ${imgApi.hits} images.`);
    } catch {
        Notiflix.Notify.failure("Something went wrong. Try to reload the page.")
        return
    }

}

async function onLoadMore() {
    try {
        const resultJson = await imgApi.fetchImages()
        if (resultJson.length < 1) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            disableMoreBtn();
            return;
        }
        renderGallery(resultJson);
        enableMoreBtn();

        const { height: cardHeight } = refs.resultContainer
        .firstElementChild.getBoundingClientRect();
        
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });

    } catch {
        Notiflix.Notify.failure("Something went wrong. Try to reload the page.")
        return
    }

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
function disableMoreBtn() {
    refs.moreButton.classList.add('hidden');
}
function enableMoreBtn() {
    refs.moreButton.classList.remove('hidden');
}