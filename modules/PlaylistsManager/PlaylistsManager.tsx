import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { TracksSearch } from './components/TracksSearch/TracksSearch';
import { TracksList } from './components/TracksList/TracksList';
import { PlaylistsList } from './components/PlaylistsList/PlaylistsList';
import { AddPlaylistModal } from './components/AddPlaylistModal/AddPlaylistModal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPlaylistsStart } from './playlistsSlice';

export const PlaylistsManager = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(loadPlaylistsStart());
  }, [dispatch]);

  return (
    <>
      <Flex justifyContent="space-between" pb={10} flexWrap="wrap">
        <Box mb={2} w={600} maxW="100%">
          <TracksSearch />
        </Box>

        <Button variant="outline" onClick={onOpen}>
          Add new playlist
        </Button>
      </Flex>

      <Box pb={4}>
        <PlaylistsList />
      </Box>

      <TracksList />

      <AddPlaylistModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
