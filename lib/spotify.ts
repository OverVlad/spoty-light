import axios from 'axios';
import { CreatePlaylistRequest } from '../types/api';
import { Playlist } from '../types/Playlists';

export const getAccessToken = async (refreshToken: string) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await axios.post<{ access_token: string }>(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return res.data;
};

type SpotifyArtist = {
  id: string;
  name: string;
  href: string;
};

type SpotifyTrack = {
  href: string;
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
  album: {
    album_type: string;
    name: string;
    release_date: string;
    total_tracks: number;
    images: { height: number; width: number; url: string }[];
  };
  artists: SpotifyArtist[];
  uri: string;
};

type SpotifySearchResponse = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?query=12&type=track&offset=0&limit=20';
    items: SpotifyTrack[];
    limit: 20;
    next: 'https://api.spotify.com/v1/search?query=12&type=track&offset=20&limit=20';
    offset: 0;
    previous: null;
    total: 10321;
  };
};

export const getTracksSearch = async ({ refreshToken, query }: { refreshToken: string; query: string }) => {
  const { access_token } = await getAccessToken(refreshToken);

  const {
    data: { tracks },
  } = await axios.get<SpotifySearchResponse>('https://api.spotify.com/v1/search', {
    params: {
      q: query,
      type: 'track',
    },
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return tracks;
};

type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  images: { width: number | null; height: number | null; url: string }[];
  name: string;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

type SpotifyPlaylistResponse = {
  items: SpotifyPlaylist[];
};

export const getCurrentUserPlaylists = async ({ refreshToken }: { refreshToken: string }) => {
  const { access_token } = await getAccessToken(refreshToken);

  const { data } = await axios.get<SpotifyPlaylistResponse>('https://api.spotify.com/v1/me/playlists', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data.items;
};

type SpotifyTrackItem = {
  track: SpotifyTrack;
  added_at: Date;
};

type SpotifyTracksResponse = {
  items: SpotifyTrackItem[];
};

export const getPlaylistsTracks = async ({
  refreshToken,
  playlistId,
}: {
  refreshToken: string;
  playlistId: string;
}) => {
  const { access_token } = await getAccessToken(refreshToken);
  const { data } = await axios.get<SpotifyTracksResponse>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data.items;
};

export const createPlaylist = async ({
  refreshToken,
  userId,
  playlist,
}: {
  refreshToken: string;
  userId: string;
  playlist: CreatePlaylistRequest['playlist'];
}) => {
  const { access_token } = await getAccessToken(refreshToken);

  const { data } = await axios.post<SpotifyPlaylist>(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      ...playlist,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  return data;
};

export const addItemsToPlaylist = async ({
  refreshToken,
  uris,
  playlistId,
}: {
  refreshToken: string;
  uris: string[];
  playlistId: string;
}) => {
  const { access_token } = await getAccessToken(refreshToken);

  const { data } = await axios.post<{ snapshot_id: string }>(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  return data;
};

export const updatePlaylist = async ({ refreshToken, playlist }: { refreshToken: string; playlist: Playlist }) => {
  const { access_token } = await getAccessToken(refreshToken);

  await axios.put<SpotifyPlaylist>(
    `https://api.spotify.com/v1/playlists/${playlist.id}`,
    {
      name: playlist.title,
      ...(playlist.description ? { description: playlist.description } : {}),
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );
};

export const removeItemPlaylist = async ({
  refreshToken,
  playlistId,
  tracksUri,
}: {
  refreshToken: string;
  playlistId: string;
  tracksUri: string[];
}) => {
  const { access_token } = await getAccessToken(refreshToken);

  await axios.delete<SpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: { Authorization: `Bearer ${access_token}` },
    data: { tracks: tracksUri.map((uri) => ({ uri })) },
  });
};
