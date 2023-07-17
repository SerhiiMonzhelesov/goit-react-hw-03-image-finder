import StyledImageGalleryItem from './StyledImageGalleryItem';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

function ImageGalleryItem({ id, tags, urlImage, urlLargeImage, toggleModal }) {
  return (
    <>
      <StyledImageGalleryItem key={id}>
        <img
          data-src={urlImage}
          alt={tags}
          className="lazyload blur-up"
          onClick={() => toggleModal({ urlLargeImage, tags })}
        />
      </StyledImageGalleryItem>
    </>
  );
}

export default ImageGalleryItem;
