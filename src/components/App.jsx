import { Component, createRef } from 'react';
import Container from './Container/Container';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../services/Api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    data: [],
    searchImagesName: '',
    numPage: null,
    perPage: 12,
    totalPages: null,
    isLoading: false,
    isShowModal: false,
    dataModalImg: null,
    errorMessage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchImagesName, numPage, perPage } = this.state;
    if (
      prevState.searchImagesName !== searchImagesName ||
      prevState.numPage !== numPage
    ) {
      try {
        this.setState({ isLoading: true });
        const dataImages = await fetchImages(
          searchImagesName,
          numPage,
          perPage
        );
        const allPages = Math.ceil(dataImages.totalHits / perPage);
        this.setState(prevState => ({
          data:
            numPage === 1
              ? dataImages.hits
              : [...prevState.data, ...dataImages.hits],
          totalPages: allPages,
        }));
      } catch (error) {
        this.setState({ errorMessage: error.response.data });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (
      prevState.data !== this.state.data &&
      numPage !== 1 &&
      numPage !== this.state.totalPages
    ) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const page = window.innerHeight;
    window.scrollTo({
      top: page * this.state.numPage,
      behavior: 'smooth',
    });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ numPage: prevState.numPage + 1 }));
  };

  handleSubmit = searchValue => {
    this.setState({
      searchImagesName: searchValue,
      numPage: 1,
    });
  };

  toggleModal = dataModal => {
    if (this.state.isShowModal) {
      this.setState(prevState => ({
        isShowModal: !prevState.isShowModal,
        dataModalImg: null,
      }));
    } else {
      this.setState(prevState => ({
        isShowModal: !prevState.isShowModal,
        dataModalImg: dataModal,
      }));
    }
  };

  render() {
    const {
      data,
      numPage,
      totalPages,
      isLoading,
      errorMessage,
      isShowModal,
      dataModalImg,
    } = this.state;

    return (
      <Container>
        <SearchBar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {errorMessage && <>Ooops... {errorMessage}</>}
        {data.length > 0 && (
          <ImageGallery images={data} toggleModal={this.toggleModal} />
        )}
        {data.length > 0 && totalPages !== numPage && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {isShowModal && (
          <Modal
            dataModalImg={dataModalImg}
            toggleModal={this.toggleModal}
          ></Modal>
        )}
      </Container>
    );
  }
}

export default App;
