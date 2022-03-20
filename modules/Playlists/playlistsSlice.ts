import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../types/Playlists';
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
    selectPlaylist: (state, action: PayloadAction<{ playlistId: string }>) => {
      state.selectedPlaylistId = action.payload.playlistId;
    },
  },
});

export const playlistSelectors = {
  getPlaylists: (state: RootState) => state.playlists.items,
  getSelectedPlaylist: (state: RootState) => {
    const selectedPlaylistId = state.playlists.selectedPlaylistId;

    return state.playlists.items.find((p) => p.id === selectedPlaylistId)
  }
};

// Action creators are generated for each case reducer function
export const { addPlaylist, selectPlaylist } = playlistsSlice.actions;
