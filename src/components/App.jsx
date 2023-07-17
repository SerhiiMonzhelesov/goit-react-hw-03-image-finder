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
  };

  loadMoreRef = createRef();

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
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (
      prevState.data !== this.state.data &&
      numPage !== 1 &&
      numPage !== this.state.totalPages
    ) {
      this.loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
    return (
      <Container>
        <SearchBar handleSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.data.length > 0 && (
          <ImageGallery
            images={this.state.data}
            toggleModal={this.toggleModal}
          />
        )}
        {this.state.data.length > 0 &&
          this.state.totalPages !== this.state.numPage && (
            <Button
              handleLoadMore={this.handleLoadMore}
              ref={this.loadMoreRef}
            />
          )}
        {this.state.isShowModal && (
          <Modal
            dataModalImg={this.state.dataModalImg}
            toggleModal={this.toggleModal}
          ></Modal>
        )}
      </Container>
    );
  }
}

export default App;
