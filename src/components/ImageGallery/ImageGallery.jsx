import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import StyledImageGallery from './StyledImageGallery';

function ImageGallery({ images, toggleModal }) {
  return (
    <StyledImageGallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            urlImage={webformatURL}
            urlLargeImage={largeImageURL}
            tags={tags}
            toggleModal={toggleModal}
          />
        );
      })}
    </StyledImageGallery>
  );
}

export default ImageGallery;
