import StyledModal from './StyledModal';
import StyledModalOverlay from './StyledModalOverlay';

function Modal({ dataModalImg: { tags, urlLargeImage }, toggleModal }) {
  const handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <StyledModalOverlay onClick={handleClickOverlay}>
      <StyledModal>
        <img src={urlLargeImage} alt={tags} loading="lazy" />
      </StyledModal>
    </StyledModalOverlay>
  );
}

export default Modal;
