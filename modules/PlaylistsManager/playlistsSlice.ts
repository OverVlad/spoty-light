import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../types/Playlists';
import { RootState } from '../../store/store';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserPlaylists } from './api';
import { PlaylistsResponse } from '../../types/api';
import { FetchStatus } from '../../types/common';
import { createStandaloneToast } from '@chakra-ui/react';

export interface PlaylistsState {
  items: Playlist[];
  fetchStatus: FetchStatus;
  selectedPlaylistId?: string;
}

const initialState: PlaylistsState = {
  items: [],
  fetchStatus: 'initial',
};

export const loadPlaylistsStart = createAction('playlists/loadPlaylistsStart');
export const loadPlaylistsSuccess = createAction<Playlist[]>('playlists/loadPlaylistsSuccess');
export const loadPlaylistsFailed = createAction('playlists/loadPlaylistsFailed');

function* loadPlaylistsSaga() {
  const toast = createStandaloneToast();

  try {
    const { data }: { data: PlaylistsResponse } = yield call(fetchUserPlaylists);
    yield put(loadPlaylistsSuccess(data.playlists));
  } catch (e) {
    toast({
      title: 'An error occurred while fetching playlists. Try to reload the page.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    yield put(loadPlaylistsFailed());
  }
}

export function* playlistsSaga() {
  yield takeLatest(loadPlaylistsStart, loadPlaylistsSaga);
}

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.items.push(action.payload);
    },
    addTrack: (state, action: PayloadAction<{ playlistId: string; track: Track }>) => {
      const playlist = state.items.find((playlist) => playlist.id === action.payload.playlistId);

      if (playlist) {
        playlist.tracks.unshift(action.payload.track);
      }
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeTrack: (state, action: PayloadAction<{ trackId: string; playlistId: string }>) => {
      const playlist = state.items.find((playlist) => playlist.id === action.payload.playlistId);

      if (playlist) {
        playlist.tracks = playlist.tracks.filter((track) => track.id !== action.payload.trackId);
      }
    },
    selectPlaylist: (state, action: PayloadAction<{ playlistId?: string }>) => {
      state.selectedPlaylistId = action.payload.playlistId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlaylistsSuccess, (state, action) => {
        state.fetchStatus = 'success';
        state.items = [...action.payload, ...state.items];
      })
      .addCase(loadPlaylistsStart, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(loadPlaylistsFailed, (state) => {
        state.fetchStatus = 'failed';
      });
  },
});

const selectSelf = (state: RootState) => state.playlists;

export const playlistSelectors = {
  getPlaylists: createSelector(selectSelf, (playlists) => playlists.items),
  getSelectedPlaylist: createSelector(selectSelf, (playlists) => {
    const selectedPlaylistId = playlists.selectedPlaylistId;

    return playlists.items.find((p) => p.id === selectedPlaylistId);
  }),
  getFetchStatus: createSelector(selectSelf, (playlists) => playlists.fetchStatus),
};

export const { addPlaylist, selectPlaylist, addTrack, removeTrack, updatePlaylist } = playlistsSlice.actions;
