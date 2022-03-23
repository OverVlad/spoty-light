import { configureStore } from '@reduxjs/toolkit';
import { playlistsSlice } from '../modules/PlaylistsManager/playlistsSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    playlists: playlistsSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
