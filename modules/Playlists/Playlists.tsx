import { Box, Button, Flex, Select } from '@chakra-ui/react';
import { SongsSearch } from './components/SongsSearch/SongsSearch';
import { SongsList } from './components/SongsList/SongsList';

export const Playlists = () => {
  return (
    <>
      <Flex justifyContent="space-between" pb={10}>
        <SongsSearch />

        <Button variant="outline">Add new playlist</Button>
      </Flex>

      <Box maxW="300px" pb={4}>
        <Select placeholder="Select playlist">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>

      <SongsList />
    </>
  );
};
