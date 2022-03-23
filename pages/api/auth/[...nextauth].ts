import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

const SPOOTIFY_SCOPES = [
  'user-read-email',
  'playlist-read-private',
  'user-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
];

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?scope=${SPOOTIFY_SCOPES.join(',')}`,
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (account) {
        token.id = profile?.id;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token as JWT & { refreshToken: string; id: string };
      return session;
    },
  },
});
