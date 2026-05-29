import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader')
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom'
})

const isVisible = 'is-visible';

export function createGallery(images) {
  const markup = images
  .map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views, 
      comments,
      downloads
    }) => `
    <li class='gallery-item'>
      <a class='gallery-link' href='${largeImageURL}'>
        <img class='gallery-image' src='${webformatURL}' alt='${tags}' />
      </a>
      <div class='image-info'>
        <p><span>Likes</span>${likes}</p>
        <p><span>Views</span>${views}</p>
        <p><span>Comments</span>${comments}</p>
        <p><span>Downloads</span>${downloads}</p>
      </div>
    </li>
    `
  )
  .join('');

  refs.gallery.innerHTML = markup;

  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add(isVisible);
}

export function hideLoader() {
  refs.loader.classList.remove(isVisible);
}
