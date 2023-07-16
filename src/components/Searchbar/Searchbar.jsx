import { Component } from 'react';
import StyledSearchBar from './StyledSearchBar';
import { CiSearch } from 'react-icons/ci';

class SearchBar extends Component {
  state = { searchNameImg: '' };

  onSearchSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.searchNameImg);
  };

  onInputChange = event => {
    this.setState({ searchNameImg: event.target.value });
    console.log(event.target.value);
  };

  render() {
    return (
      <StyledSearchBar className="searchbar">
        <form className="form" onSubmit={this.onSearchSubmit}>
          <button type="submit" className="button">
            <CiSearch className="icon" />
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </StyledSearchBar>
    );
  }
}

export default SearchBar;
