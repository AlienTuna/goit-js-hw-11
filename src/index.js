// import Notiflix from "notiflix";
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

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.moreButton.addEventListener('click', onLoadMore);

async function onSearchSubmit(e) {
    e.preventDefault();

    clearGallery();
    imgApi.resetPage();
    imgApi.query = e.currentTarget.elements.searchQuery.value;
    const resultJson = await imgApi.fetchImages()
    renderGallery(resultJson)
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
        <b>Likes: ${img.likes}</b>
        </p>
        <p class="info-item">
        <b>Views: ${img.views}</b>
        </p>
        <p class="info-item">
        <b>Comments: ${img.comments}</b>
        </p>
        <p class="info-item">
        <b>Downloads: ${img.downloads}</b>
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