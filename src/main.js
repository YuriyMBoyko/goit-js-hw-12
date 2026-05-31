import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton 
} from './js/render-functions.js';

const refs = {
  searchForm: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.load-more-btn')
}

let queryText = '';
let pageNumber = 1;
let cardShown = 0;

const messageNoQueryEntered = 'Please, enter query for search!';
const messageNoImagesFound = 'Sorry, there are no images matching your search query. Please try again!';
const messageConnectError = 'An error occurred. Please, try again later!';
const messageEndReached = 'We\'re sorry, but you\'ve reached the end of search results.';

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

  queryText = query
  pageNumber = 1;
  cardShown = 0;

  clearGallery();

  loadImages(event, queryText, pageNumber);
});

refs.loadMoreBtn.addEventListener('click', () => {
  pageNumber++;
  loadImages(null, queryText, pageNumber);
});

async function loadImages(event, query, page) {
  hideLoadMoreButton();
  showLoader();

  let totalHits = 0;

  try{
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    cardShown += data.hits.length;
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: messageNoImagesFound,
        position: 'topRight'
      })
    } else {
      createGallery(data.hits);
      smoothScroll();
    }
  } catch(error) {
    iziToast.error({
      title: 'Error',
      message: messageConnectError,
      position: 'topRight'
    });
  } finally {
    hideLoader();
    if (totalHits > cardShown) {
      showLoadMoreButton();
    } else if (totalHits !== 0) {
      iziToast.info({
        title: 'Info',
        message: messageEndReached,
        position: 'topRight'
      });
    }
    if (event !== null) {
      event.target.reset();
    }
  }
};

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth'
    });
  }
}