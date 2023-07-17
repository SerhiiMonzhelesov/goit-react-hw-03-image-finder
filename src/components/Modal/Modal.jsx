import { Component } from 'react';
import StyledModal from './StyledModal';
import StyledModalOverlay from './StyledModalOverlay';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyClosed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyClosed);
  }

  handleKeyClosed = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { tags, urlLargeImage } = this.props.dataModalImg;
    return (
      <StyledModalOverlay onClick={this.handleClickOverlay}>
        <StyledModal>
          <img
            data-src={urlLargeImage}
            alt={tags}
            className="lazyload blur-up"
          />
        </StyledModal>
      </StyledModalOverlay>
    );
  }
}

export default Modal;
