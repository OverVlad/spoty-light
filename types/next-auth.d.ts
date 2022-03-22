/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: JWT & {
      refreshToken: string;
    };
  }
}
