import { VStack, Select, Text, Skeleton, useDisclosure, Button, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelectors, selectPlaylist } from '../../playlistsSlice';
import { SyntheticEvent, useCallback } from 'react';
import sanitizeHtml from 'sanitize-html';
import { ManagePlaylistModal } from '../ManagePlaylistModal/ManagePlaylistModal';

export const PlaylistsList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const playlists = useSelector(playlistSelectors.getPlaylists);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const fetchStatus = useSelector(playlistSelectors.getFetchStatus);
  const dispatch = useDispatch();

  const onPlaylistSelect = useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      const playlistId = e.currentTarget.value;

      if (playlistId) {
        dispatch(selectPlaylist({ playlistId }));
      } else {
        selectPlaylist({});
      }
    },
    [dispatch],
  );

  return (
    <VStack spacing={3} alignItems="flex-start">
      <HStack>
        <Skeleton isLoaded={fetchStatus === 'success'}>
          <Select
            placeholder="Select playlist"
            onChange={onPlaylistSelect}
            value={selectedPlaylist?.id}
            maxW="300px"
            data-testid="select-playlist"
          >
            {playlists.map((playlist) => (
              <option value={playlist.id} key={playlist.id}>
                {playlist.title}
              </option>
            ))}
          </Select>
        </Skeleton>

        {selectedPlaylist && (
          <>
            <Button onClick={onOpen}>Update playlist details</Button>
            <ManagePlaylistModal onClose={onClose} selectedPlaylist={selectedPlaylist} isOpen={isOpen} />
          </>
        )}
      </HStack>

      {selectedPlaylist?.description && (
        <Text wordBreak="break-word" dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedPlaylist.description) }} />
      )}
    </VStack>
  );
};
