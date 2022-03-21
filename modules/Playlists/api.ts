import axios from 'axios';
import { SearchTracksRequest } from '../../types/api';

export const fetchTracks = (params: SearchTracksRequest) => axios.get('/api/tracks', { params });
