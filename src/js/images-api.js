// import axios from "axios";

// const axios = require('axios').default;
// const ax = new axios;
const API_KEY = '29596647-f7db787be5835d1b0c2ce2eda'
const API_URL = 'https://pixabay.com/api/'
const PER_PAGE = 3
const SET = '&image_type=photo&orientation=horizontal&safesearch=true&category=backgrounds'

export default class ImagesApi {
constructor() {
    this.searchQuery = '';
    this.page = 1;
}

 async fetchImages() {
    const url = `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}${SET}`;
    const result = await fetch(url);
     const data = await result.json();
     this.page += 1;
     return data.hits;
}
resetPage() {
    this.page = 1;
}
get query() {
    return this.searchQuery;
}
set query(newQuery) {
    this.searchQuery = newQuery;
}
}