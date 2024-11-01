import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '46849389-2041d53e6d8b95dbaa186e245';

const fetchImages = query => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Oooops!');
      }
      return res.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      return data.hits;
    });
};

export default fetchImages;
