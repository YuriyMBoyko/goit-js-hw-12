import axios from 'axios';

export function getImagesByQuery(query) {
  const pixabayApiKey = '56037316-398dfc4475139038527660650';
  const url = `https://pixabay.com/api/`;

  return axios.get(url,
    {
      params: {
        key: pixabayApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
      }
    }
  )
  .then(response => {
    return response.data;
  });
}
