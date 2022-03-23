import { configureStore } from '@reduxjs/toolkit';
import { playlistsSlice } from '../modules/Playlists/playlistsSlice';
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
