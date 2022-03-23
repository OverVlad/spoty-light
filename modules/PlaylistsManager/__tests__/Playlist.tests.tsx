import { render, screen, waitFor } from '../../../utils/tests-utils';
import { rest } from 'msw';
import { PlaylistsManager } from '../PlaylistsManager';
import { mswServer } from '../../../mocks/server-mocks';
import userEvent from '@testing-library/user-event';
import { CreatePlaylistRequest } from '../../../types/api';

const renderPlaylist = () => render(<PlaylistsManager />);

describe('PlaylistsManager module tests', () => {
  beforeEach(() => {
    mswServer.use(
      rest.get('/api/playlists', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ playlists: [] }));
      }),
      rest.post<CreatePlaylistRequest>('/api/playlists', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            playlist: {
              id: 'randomId',
              title: req.body.playlist.name,
              description: req.body.playlist.description,
              tracks: [],
            },
          }),
        );
      }),
    );
  });

  it('should render module', async () => {
    renderPlaylist();

    expect(await screen.findByText('Add new playlist')).toBeInTheDocument();
  });

  it('should add new playlist', async () => {
    renderPlaylist();

    const addPlaylistBtn = await screen.findByText('Add new playlist');

    userEvent.click(addPlaylistBtn);

    const inputName = await screen.findByPlaceholderText('Playlist name');
    const submitBtn = await screen.findByText('Create');

    userEvent.type(inputName, 'Test Playlist');
    userEvent.click(submitBtn);

    await waitFor(() =>
      expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Test Playlist' }).selected).toBeTruthy(),
    );
  });
});
