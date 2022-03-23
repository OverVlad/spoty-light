import { all } from 'redux-saga/effects';
import { playlistsSaga } from '../modules/PlaylistsManager/playlistsSlice';

export function* rootSaga() {
  yield all([playlistsSaga()]);
}
