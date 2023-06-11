import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.css";
import ImagesApi from "./js/images-api";
import refs from "./js/refs";
import renderGallery from "./js/render-gallery";
import Notification from "./js/notifications";

const not = new Notification;
not.initNotifications();

const imgApi = new ImagesApi();

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.moreButton.addEventListener('click', onLoadMore);

refs.moreButton.classList.add('hidden');


async function onSearchSubmit(e) {
    e.preventDefault();
    
    disableMoreBtn();
    refs.resultFooter.classList.add('hidden');

    clearGallery();
    imgApi.resetPage();
    imgApi.query = e.currentTarget.elements.searchQuery.value;
    try {
        const resultJson = await imgApi.fetchImages()
        if (resultJson.length < 1) {
            not.emptyResult();
            return
        }

        renderGallery(resultJson);
        not.success(imgApi.hits)
        if (resultJson.length < 40 || imgApi.hits <= 40) {
            showFooter();
            return
        }
        enableMoreBtn();
    } catch {
        not.error();
        return
    }

}

async function onLoadMore() {
    try {
        const resultJson = await imgApi.fetchImages()
        if (resultJson.length < 1) {
            not.emptyResult();
            disableMoreBtn();
            return;
        }
        renderGallery(resultJson);

        const { height: cardHeight } = refs.resultContainer
        .firstElementChild.getBoundingClientRect();
        
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });


        if (resultJson.length < 40){
            showFooter();
            return
        }
      enableMoreBtn();
    } catch {
        not.error();
        return
    }

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
function showFooter() {
    refs.resultFooter.innerHTML = `You have riched the end of search results.`
    refs.resultFooter.classList.remove('hidden')
    disableMoreBtn();
}