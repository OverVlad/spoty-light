import { HStack, Select, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelectors, selectPlaylist } from '../../playlistsSlice';
import { SyntheticEvent, useCallback } from 'react';

export const PlaylistsList = () => {
  const playlists = useSelector(playlistSelectors.getPlaylists);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const dispatch = useDispatch();

  const onPlaylistSelect = useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      const playlistId = e.currentTarget.value;
      dispatch(selectPlaylist({ playlistId }));
    },
    [dispatch],
  );

  console.log(selectedPlaylist);

  return (
    <HStack spacing={3} alignItems="flex-start">
      <Select placeholder="Select playlist" onChange={onPlaylistSelect} value={selectedPlaylist?.id} maxW="300px">
        {playlists.map((playlist) => (
          <option value={playlist.id} key={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </Select>

      <Text>{selectedPlaylist?.description}</Text>
    </HStack>
  );
};
