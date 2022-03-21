import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { TracksSearch } from './components/TracksSearch/TracksSearch';
import { TracksList } from './components/TracksList/TracksList';
import { PlaylistsList } from './components/PlaylistsList/PlaylistsList';
import { AddPlaylistModal } from './components/AddPlaylistModal/AddPlaylistModal';

export const Playlists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent="space-between" pb={10}>
        <TracksSearch />

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
