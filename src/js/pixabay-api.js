import iziToast from 'izitoast';

export default function fetchPhotos(search) {
  const searchParams = new URLSearchParams({
    key: '34668694-a67447f729748c64ab9ad3b4f',
    q: `"${search}"`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`);
}
