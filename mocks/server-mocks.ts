import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const mockSession = {
  user: {
    email: 'vlad@gmail.com',
    exp: 1650649871,
    iat: 1648057871,
    id: 'id',
    jti: '12',
    name: 'Vlad',
    picture: 'picture',
    refreshToken: 'token',
    sub: '123',
  },
  expires: 123213139,
};

export const mswServer = setupServer(
  // Mock next-auth
  rest.get('/api/auth/session', (req, res, ctx) => res(ctx.status(200), ctx.json(mockSession))),
);
