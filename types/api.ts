import { Playlist, Track } from './Playlists';

export type ApiErrorType = { message: string };

export type SearchTracksRequest = { query: string };
export type SearchTrackResponse = { tracks: Track[] };
export type PlaylistsResponse = { playlists: Playlist[] };
