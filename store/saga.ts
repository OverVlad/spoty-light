import { all } from 'redux-saga/effects';
import { playlistsSaga } from '../modules/Playlists/playlistsSlice';

export function* rootSaga() {
  yield all([playlistsSaga()]);
}
