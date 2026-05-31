import axios from 'axios';

var imagesPerPage = 15;

export async function getImagesByQuery(query, page) {
  const pixabayApiKey = '56037316-398dfc4475139038527660650';
  const url = `https://pixabay.com/api/`;

  const response = await axios.get(url,
    {
      params: {
        key: pixabayApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: imagesPerPage 
      }
    }
  );

  return response.data;
}
