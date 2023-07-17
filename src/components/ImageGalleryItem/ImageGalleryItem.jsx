import StyledImageGalleryItem from './StyledImageGalleryItem';

function ImageGalleryItem({ id, tags, urlImage, urlLargeImage, toggleModal }) {
  return (
    <>
      <StyledImageGalleryItem key={id}>
        <img
          src={urlImage}
          alt={tags}
          loading="lazy"
          onClick={() => toggleModal({ urlLargeImage, tags })}
        />
      </StyledImageGalleryItem>
    </>
  );
}

export default ImageGalleryItem;
