import { apiRouteHandler } from '../../utils/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { SearchTracksRequest, SearchTrackResponse, ApiErrorType } from '../../types/api';
import { getSession } from 'next-auth/react';
import { getTracksSearch } from '../../lib/spotify';

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<SearchTrackResponse | ApiErrorType>) => {
    const { query } = req.query as SearchTracksRequest;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    const refreshToken = session.user.refreshToken;

    const tracks = await getTracksSearch({ refreshToken, query });

    return res.status(200).json({
      tracks: tracks.items.map((t) => ({
        name: t.name,
        id: t.id,
        preview_url: t.preview_url,
        artist: t.artists,
        uri: t.uri,
        album: {
          name: t.album.name,
          release_date: t.album.release_date,
          images: t.album.images,
        },
      })),
    });
  },
});
