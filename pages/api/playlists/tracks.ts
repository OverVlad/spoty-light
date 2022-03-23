import { apiRouteHandler } from '../../../utils/api-handler';
import {
  AddTrackPlaylistRequest,
  AddTrackPlaylistResponse,
  ApiErrorType,
  RemovePlaylistTrackRequest,
} from '../../../types/api';
import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import { addItemsToPlaylist, removeItemPlaylist } from '../../../lib/spotify';

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
  delete: async (req, res) => {
    const body = req.body as RemovePlaylistTrackRequest;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    await removeItemPlaylist({
      refreshToken: session.user.refreshToken,
      playlistId: body.playlistId,
      tracksUri: body.tracks.map((t) => t.uri),
    });

    res.status(200).end();
  },
});
