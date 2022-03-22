import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../types/Playlists';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store';

export interface PlaylistsState {
  items: Playlist[];
  selectedPlaylistId?: string;
}

const initialState: PlaylistsState = {
  items: [
    {
      id: uuidv4(),
      tracks: [],
      title: 'Default playlist',
    },
  ],
};

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
        playlist.tracks.push(action.payload.track);
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
});

const selectSelf = (state: RootState) => state.playlists;

export const playlistSelectors = {
  getPlaylists: createSelector(selectSelf, (playlists) => playlists.items),
  getSelectedPlaylist: createSelector(selectSelf, (playlists) => {
    const selectedPlaylistId = playlists.selectedPlaylistId;

    return playlists.items.find((p) => p.id === selectedPlaylistId);
  }),
};

// Action creators are generated for each case reducer function
export const { addPlaylist, selectPlaylist, addTrack, removeTrack } = playlistsSlice.actions;
