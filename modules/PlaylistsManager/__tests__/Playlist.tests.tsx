import { render, screen, waitFor } from '../../../utils/tests-utils';
import { rest } from 'msw';
import { PlaylistsManager } from '../PlaylistsManager';
import { mswServer } from '../../../mocks/server-mocks';
import userEvent from '@testing-library/user-event';
import { CreatePlaylistRequest, UpdatePlaylistRequest } from '../../../types/api';

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

  it('should update playlist', async () => {
    mswServer.use(
      rest.get('/api/playlists', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ playlists: [{ id: 'id', title: 'Playlist Title', tracks: [] }] }));
      }),
      rest.put<UpdatePlaylistRequest>('/api/playlists', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ playlist: req.body.playlist }));
      }),
    );

    renderPlaylist();

    const playlistOption = await screen.findByText<HTMLOptionElement>('Playlist Title');
    const playlistSelectEl = await screen.findByTestId('select-playlist');

    userEvent.selectOptions(playlistSelectEl, [playlistOption.value]);

    const updatePlaylistBtn = await screen.findByText('Update playlist details');

    userEvent.click(updatePlaylistBtn);

    const inputName = await screen.getByTestId('playlist-name-input');
    const updateBtn = await screen.getByText('Update');

    userEvent.type(inputName, ' + new text');
    userEvent.click(updateBtn);

    await waitFor(() =>
      expect(
        screen.getByRole<HTMLOptionElement>('option', { name: 'Playlist Title + new text' }).selected,
      ).toBeTruthy(),
    );
  });
});
