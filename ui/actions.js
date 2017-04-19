export function updateSearchInput(input) {
  return {
    type: 'UPDATE_SEARCH_INPUT',
    input,
  };
}

export function getSearchResults(results) {
  return {
    type: 'GET_SEARCH_RESULTS',
    movies: results,
  };
}

