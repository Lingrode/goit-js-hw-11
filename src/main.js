import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import createMarkup from './js/render-functions';
import iconError from './img/icon-error.svg';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search"]');
const imageList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

iziToast.settings({
  messageSize: 15,
  messageColor: '#fff',
  messageLineHeight: 20,
  iconUrl: `${iconError}`,
  position: 'topRight',
  timeout: 7000,
  closeOnClick: true,
  maxWidth: 350,
  backgroundColor: 'rgb(239, 64, 64)',
});

let gallery = new SimpleLightbox('.gallery .gallery-link');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    iziToast.error({
      message:
        'Search field cannot be empty. Please enter a keyword to search.',
    });

    return;
  }

  imageList.innerHTML = '';
  loader.style.display = 'block';

  fetchImages(searchValue)
    .then(data => {
      const markup = createMarkup(data);
      imageList.insertAdjacentHTML('beforeend', markup);
      loader.style.display = 'none';
      gallery.refresh();
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error(error);
    });

  form.reset();
}
