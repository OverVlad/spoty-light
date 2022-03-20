import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Image, List, ListItem, VStack, Text, Box, IconButton, Alert, AlertIcon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { playlistSelectors } from '../../playlistsSlice';

export const SongsList = () => {
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  if (!selectedPlaylist) {
    return (
      <Alert status="info">
        <AlertIcon />
        Select playlist to see a songs
      </Alert>
    );
  }

  if (selectedPlaylist.songs.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No song added. You can add songs in the song search
      </Alert>
    );
  }

  return (
    <List spacing={3}>
      {selectedPlaylist.songs.map((song) => (
        <ListItem key={song.id} p={3} border="1px" borderRadius="md" borderColor="gray.200">
          <HStack justifyContent="space-between">
            <HStack>
              <Image w="50px" h="50px" src={song.cover} alt={`${song.name} image`} mr={3} />

              <VStack alignItems="flex-start">
                <Text fontWeight="bold">{song.name}</Text>
                <Text>{song.artist}</Text>
              </VStack>
            </HStack>

            <Text>{song.album}</Text>

            <Text>{new Intl.DateTimeFormat('en-US').format(song.releaseData)}</Text>

            <Box>
              <IconButton icon={<DeleteIcon />} aria-label="Delete song" />
            </Box>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
