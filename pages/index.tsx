import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Playlists } from '../modules/Playlists/Playlists';

const Home: NextPage = () => {
  return (
    <Box py={4}>
      <Playlists />
    </Box>
  );
};

export default Home;
