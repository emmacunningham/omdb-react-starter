import { connect } from 'react-redux';
import Search from '../search';
import store from '../store';
import { updateSearchInput } from '../actions';

import './style.css';

function mapStateToProps(state) {
  return {
    searchInput: state.searchInput,
    movies: state.movies,
  };
}

@connect(mapStateToProps)
export default class Index extends React.Component {
  static propTypes = {
    searchInput: React.PropTypes.string,
    movies: React.PropTypes.arrayOf(React.PropTypes.shape),
  }

  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleSearch = () => {
    store.dispatch(updateSearchInput(this.state.value));
  }

  handleInputChange = () => {
    this.setState({ value: this.textInput.state.value });
  }

  renderMovie(movie, idx) {
    const { Poster, Title, Year } = movie;
    return (
      <div key={idx}>
        <div><img src={Poster} alt="poster" /></div>
        <div>{Title}</div>
        <div>{Year}</div>
      </div>
    );
  }

  renderMovies() {
    const { movies } = this.props;
    return movies.map(this.renderMovie);
  }

  render() {
    const inputProps = {
      onChange: this.handleInputChange,
      ref: (input) => { this.textInput = input; },
      value: this.props.searchInput,
    };

    return (
      <div>
        <Search {...inputProps} />
        <button onClick={this.handleSearch}>Search</button>
        {this.renderMovies()}
      </div>
    );
  }
}
