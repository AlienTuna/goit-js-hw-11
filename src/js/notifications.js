import Notiflix from "notiflix";



export default class Notification {
     constructor() {}
     emptyResult() {
        Notiflix
        .Notify
        .warning("Sorry, there are no images matching your search query. Please try again.");
     }
     nothingMore() {
      Notiflix
      .Notify
      .warning("We're sorry, but you've reached the end of search results.");
     }
     success(hitsCount) {
        Notiflix.Notify.success(`Hooray! We found ${hitsCount} images.`);
        return;
     }
     error() {
        Notiflix
        .Notify
        .failure("Something went wrong. Try to reload the page.")
       
     }
     initNotifications() {
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
     }
}