import axios from 'axios';
import {
  AddTrackPlaylistRequest,
  AddTrackPlaylistResponse,
  CreatePlaylistRequest,
  CreatePlaylistResponse,
  PlaylistsResponse,
  RemovePlaylistTrackRequest,
  SearchTrackResponse,
  SearchTracksRequest,
  UpdatePlaylistRequest,
  UpdatePlaylistResponse,
} from '../../types/api';

export const fetchTracks = (params: SearchTracksRequest) => axios.get<SearchTrackResponse>('/api/tracks', { params });
export const fetchUserPlaylists = () => axios.get<PlaylistsResponse>('/api/playlists');
export const createPlaylist = (body: CreatePlaylistRequest) =>
  axios.post<CreatePlaylistResponse>('/api/playlists', body);
export const addTrackToPlaylist = (body: AddTrackPlaylistRequest) =>
  axios.post<AddTrackPlaylistResponse>('/api/playlists/tracks', body);

export const updatePlaylist = (body: UpdatePlaylistRequest) =>
  axios.put<UpdatePlaylistResponse>('/api/playlists', body);

export const removePlaylistTrack = (body: RemovePlaylistTrackRequest) =>
  axios.delete<undefined>('/api/playlists/tracks', { data: body });
