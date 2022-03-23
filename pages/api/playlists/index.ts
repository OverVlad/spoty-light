import { apiRouteHandler } from '../../../utils/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  ApiErrorType,
  CreatePlaylistRequest,
  CreatePlaylistResponse,
  PlaylistsResponse,
  UpdatePlaylistRequest,
  UpdatePlaylistResponse,
} from '../../../types/api';
import { getSession } from 'next-auth/react';
import { createPlaylist, getCurrentUserPlaylists, getPlaylistsTracks, updatePlaylist } from '../../../lib/spotify';

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<PlaylistsResponse | ApiErrorType>) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    const refreshToken = session.user.refreshToken;

    const playlists = await getCurrentUserPlaylists({ refreshToken });

    const playlistsWithTracks = await Promise.all(
      playlists.map(async (playlist) => {
        const tracks = await getPlaylistsTracks({ refreshToken, playlistId: playlist.id });
        return {
          id: playlist.id,
          title: playlist.name,
          description: playlist.description,
          tracks: tracks.map(({ track }) => ({
            name: track.name,
            id: track.id,
            uri: track.uri,
            artist: track.artists,
            album: {
              name: track.album.name,
              release_date: track.album.release_date,
              images: track.album.images,
            },
          })),
        };
      }),
    );

    return res.status(200).json({
      playlists: playlistsWithTracks,
    });
  },
  post: async (req, res: NextApiResponse<CreatePlaylistResponse | ApiErrorType>) => {
    const body = req.body as CreatePlaylistRequest;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    const {
      user: { refreshToken, id },
    } = session;

    const playlist = await createPlaylist({ refreshToken, userId: id, playlist: body.playlist });

    return res.status(200).json({
      playlist: {
        id: playlist.id,
        title: playlist.name,
        description: playlist.description,
        tracks: [],
      },
    });
  },
  put: async (req, res: NextApiResponse<UpdatePlaylistResponse | ApiErrorType>) => {
    const body = req.body as UpdatePlaylistRequest;

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    const {
      user: { refreshToken },
    } = session;

    await updatePlaylist({ refreshToken, playlist: body.playlist });

    return res.status(200).json({
      playlist: body.playlist,
    });
  },
});
