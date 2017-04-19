const initialState = {
  searchInput: '',
  movies: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_INPUT':
      return { ...state, searchInput: action.input };
    case 'GET_SEARCH_RESULTS':
      return { ...state, movies: action.movies };
    default: return state;
  }
}
