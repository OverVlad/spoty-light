import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { SongsSearch } from './components/SongsSearch/SongsSearch';
import { SongsList } from './components/SongsList/SongsList';
import { PlaylistsList } from './components/PlaylistsList/PlaylistsList';
import { AddPlaylistModal } from './components/AddPlaylistModal/AddPlaylistModal';

export const Playlists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent="space-between" pb={10}>
        <SongsSearch />

        <Button variant="outline" onClick={onOpen}>
          Add new playlist
        </Button>
      </Flex>

      <Box pb={4}>
        <PlaylistsList />
      </Box>

      <SongsList />

      <AddPlaylistModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
