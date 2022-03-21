import { apiRouteHandler } from '../../utils/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getAccessToken } from '../../utils/spotify-access-token';
import { SearchTracksRequest } from '../../types/api';
import { getSession } from 'next-auth/react';
import { Track } from '../../types/Playlists';

type Artist = {
  id: string;
  name: string;
  href: string;
};

type SearchTrackResponse = {
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
  };
  artists: Artist[];
};

type SearchResponse = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?query=12&type=track&offset=0&limit=20';
    items: SearchTrackResponse[];
    limit: 20;
    next: 'https://api.spotify.com/v1/search?query=12&type=track&offset=20&limit=20';
    offset: 0;
    previous: null;
    total: 10321;
  };
};

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<{ message: string } | { tracks: Track[] }>) => {
    const { query } = req.query as SearchTracksRequest;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Player is not authenticated',
      });
    }

    const refreshToken = session.user.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: 'refreshToken is required' });
    }

    const { access_token } = await getAccessToken(refreshToken);

    const {
      data: { tracks },
    } = await axios.get<SearchResponse>('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track',
      },
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.status(200).json({
      tracks: tracks.items.map((t) => ({
        name: t.name,
        id: t.id,
        preview_url: t.preview_url,
        artist: t.artists,
        album: {
          name: t.album.name,
          release_date: t.album.release_date,
        },
      })),
    });
  },
});
