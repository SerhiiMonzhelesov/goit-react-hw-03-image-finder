import { Component } from 'react';
import Container from './Container/Container';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../services/Api';

class App extends Component {
  state = {
    data: [],
    searchImagesName: '',
    numPage: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchImagesName, numPage } = this.state;
    if (prevState.searchImagesName !== this.state.searchImagesName) {
      try {
        const dataImages = await fetchImages(searchImagesName, numPage);
        this.setState({ data: dataImages });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleSubmit = searchValue => {
    this.setState({ searchImagesName: searchValue });
  };

  render() {
    return (
      <>
        <Container>
          <SearchBar handleSubmit={this.handleSubmit}></SearchBar>
          {this.state.data.length > 0 && (
            <ImageGallery images={this.state.data} />
          )}
        </Container>
      </>
    );
  }
}

export default App;
