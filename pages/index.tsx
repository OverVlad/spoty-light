import type { NextPage } from 'next';
import { Box, Button } from '@chakra-ui/react';
import { Playlists } from '../modules/Playlists/Playlists';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <Box py={4}>{session ? <Playlists /> : <Button onClick={() => signIn()}>Sign in</Button>}</Box>;
};

export default Home;
