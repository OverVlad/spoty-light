import axios from 'axios';
import { SearchTrackResponse, SearchTracksRequest } from '../../types/api';

export const fetchTracks = (params: SearchTracksRequest) => axios.get<SearchTrackResponse>('/api/tracks', { params });
