import axios from 'axios';
import {
  CreatePlaylistRequest,
  CreatePlaylistResponse,
  PlaylistsResponse,
  SearchTrackResponse,
  SearchTracksRequest,
} from '../../types/api';

export const fetchTracks = (params: SearchTracksRequest) => axios.get<SearchTrackResponse>('/api/tracks', { params });
export const fetchUserPlaylists = () => axios.get<PlaylistsResponse>('/api/playlists');
export const createPlaylist = (body: CreatePlaylistRequest) =>
  axios.post<CreatePlaylistResponse>('/api/playlists', body);
