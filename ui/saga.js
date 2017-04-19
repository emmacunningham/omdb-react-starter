import { call } from 'redux-saga/effects';

const sagas = [];

export default function* saga() {
  yield sagas.map(fn => call(fn));
}
