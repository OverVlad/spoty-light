import axios from 'axios';

export const fetchTracks = ({ query }: { query: string }) => axios.get('/api/tracks', { params: { query } });
