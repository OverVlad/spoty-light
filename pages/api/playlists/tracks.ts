import { apiRouteHandler } from '../../../utils/api-handler';
import { AddTrackPlaylistRequest, AddTrackPlaylistResponse, ApiErrorType } from '../../../types/api';
import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import { addItemsToPlaylist } from '../../../lib/spotify';

export default apiRouteHandler({
  post: async (req, res: NextApiResponse<AddTrackPlaylistResponse | ApiErrorType>) => {
    const body = req.body as AddTrackPlaylistRequest;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    await addItemsToPlaylist({
      refreshToken: session.user.refreshToken,
      playlistId: body.playlistId,
      uris: [body.track.uri],
    });

    return res.status(200).json({
      playlistId: body.playlistId,
      track: body.track,
    });
  },
});
