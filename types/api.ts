import { Playlist, Track } from './Playlists';

export type ApiErrorType = { message: string };

export type SearchTracksRequest = { query: string };
export type SearchTrackResponse = { tracks: Track[] };
export type PlaylistsResponse = { playlists: Playlist[] };

export type CreatePlaylistResponse = { playlist: Playlist };
export type CreatePlaylistRequest = { playlist: { name: string; description?: string } };

export type AddTrackPlaylistResponse = { track: Track; playlistId: string };
export type AddTrackPlaylistRequest = { track: Track; playlistId: string };

export type UpdatePlaylistResponse = { playlist: Playlist };
export type UpdatePlaylistRequest = { playlist: Playlist };

export type RemovePlaylistTrackRequest = { playlistId: string; tracks: Track[] };
