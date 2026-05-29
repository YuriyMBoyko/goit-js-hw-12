import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader 
} from './js/render-functions.js';

const refs = {
  searchForm: document.querySelector('.form')
}

const messageNoQueryEntered = 'Please, enter query for search!';
const messageNoImagesFound = 'Sorry, there are no images matching your search query. Please try again!';
const messageConnectError = 'An error occurred. Please, try again later!';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: messageNoQueryEntered,
      position: 'topRight'
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: messageNoImagesFound,
          position: 'topRight'
        })
      } else {
        createGallery(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: messageConnectError,
        position: 'topRight'
      });
    })
    .finally(() => {
      hideLoader();
      event.target.reset();
    })
});
