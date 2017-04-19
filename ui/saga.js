import { call, put, take, select } from 'redux-saga/effects';
import { getSearchResults } from './actions';

const OMDB_ENDPOINT = 'http://www.omdbapi.com/?s=';

export const fetchMovies = query => fetch(OMDB_ENDPOINT + query).then(response => response.json());

export const getQuery = state => state.searchInput;

export function* loadMovies() {
  try {
    const query = yield select(getQuery);
    const omdbResponse = yield call(fetchMovies, query);

    if (omdbResponse.Response === 'False') {
      throw omdbResponse.Error;
    }
    const movies = omdbResponse.Search;

    yield put(getSearchResults(movies));
  } catch (error) {
    yield put({ type: 'LOAD_MOVIES_FAILURE', error });
  }
}

export function* watchForLoadMovies() {
  while (true) {
    yield take('UPDATE_SEARCH_INPUT');
    yield call(loadMovies);
  }
}

const sagas = [watchForLoadMovies];


export default function* saga() {
  yield sagas.map(fn => call(fn));
}
