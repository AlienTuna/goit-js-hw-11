const axios = require('axios').default;
const API_KEY = '29596647-f7db787be5835d1b0c2ce2eda'
const API_URL = 'https://pixabay.com/api/'
// const PER_PAGE = 40
// const SET = '&image_type=photo&orientation=horizontal&safesearch=true&category=backgrounds'

export default class ImagesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = '';
        this.perPage = 40;
    }

    async fetchImages() {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    key: API_KEY,
                    q: this.searchQuery,
                    page: this.page,
                    per_page: this.perPage,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: 'true',
                }
            }
            )
    
            this.page += 1;
            this.totalHits = response.data.totalHits;
            return response.data.hits;
            
        } catch (error) {
            console.log(error);         
        }

    }
    //  async fetchImages() {
    //     const url = `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}${SET}`;
    //     const result = await fetch(url);
    //     const data = await result.json();
    //     this.page += 1;
    //     this.totalHits = data.totalHits;
    //     return data.hits;
    // }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    get hits() {
        return this.totalHits;
    }

    get maxCount() {
        return this.perPage
    }
}