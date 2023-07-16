import StyledImageGallery from './StyledImageGallery';

function ImageGallery({ images }) {
  return (
    <StyledImageGallery>
      {images.map(({ id, webformatURL }) => {
        return (
          <li key={id}>
            <img src={webformatURL} loading="lazy" width="300" />
          </li>
        );
      })}
    </StyledImageGallery>
  );
}

export default ImageGallery;
