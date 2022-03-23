import { apiRouteHandler } from '../../utils/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorType, PlaylistsResponse } from '../../types/api';
import { getSession } from 'next-auth/react';
import { getCurrentUserPlaylists, getPlaylistsTracks } from '../../lib/spotify';

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
});
