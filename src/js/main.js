import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let page = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.add('show');

  try {
    const data = await fetchImages(query);
    loader.classList.remove('show');

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Oops',
        message: 'No images found',
      });
      return;
    }

    renderImages(data.hits);
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  } catch (error) {
    loader.classList.remove('show');
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong',
    });
  }
});
