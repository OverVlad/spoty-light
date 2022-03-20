import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Image, List, ListItem, VStack, Text, Box, IconButton } from '@chakra-ui/react';

const songs = [
  {
    id: '1',
    name: 'Track name',
    cover: 'https://online.berklee.edu/takenote/wp-content/uploads/2019/03/killerHooks-1920x1200.png',
    artist: 'Artist(s)',
    album: 'Album name',
    releaseData: new Date('2020'),
  },
];

export const SongsList = () => (
  <List spacing={3}>
    {songs.map((song) => (
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
