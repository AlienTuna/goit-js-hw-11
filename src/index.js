// import Notiflix from "notiflix";
// import Axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
import ImagesApi from "./js/images-api";
import galleryTpl from './templates/gallery.hbs';

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

function renderGallery(json) {
    refs.resultContainer.insertAdjacentHTML('beforeend', galleryTpl(json))
    lightbox.refresh();
}

function clearGallery() {
    refs.resultContainer.innerHTML = '';
}