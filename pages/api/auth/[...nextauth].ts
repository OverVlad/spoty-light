import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token as JWT & { refreshToken: string };
      return session;
    },
  },
});
