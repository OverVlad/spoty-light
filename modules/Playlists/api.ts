import axios from 'axios';
import { PlaylistsResponse, SearchTrackResponse, SearchTracksRequest } from '../../types/api';

export const fetchTracks = (params: SearchTracksRequest) => axios.get<SearchTrackResponse>('/api/tracks', { params });
export const fetchUserPlaylists = () => axios.get<PlaylistsResponse>('/api/playlists');
