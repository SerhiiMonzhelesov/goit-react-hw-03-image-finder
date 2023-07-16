import axios from 'axios';

const fetchImages = async (searchImagesName, numPage) => {
  const baseUrl = `https://pixabay.com/api/`;
  const paramsUrl = {
    params: {
      key: '37645850-cbffd1b84ba77554534d72cec',
      q: searchImagesName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: numPage,
      per_page: 12,
    },
  };
  const images = await axios.get(baseUrl, paramsUrl);

  return images.data.hits;
};

export default fetchImages;
