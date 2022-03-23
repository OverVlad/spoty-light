import type { NextPage } from 'next';
import { Box, Flex, Button, Heading, VStack } from '@chakra-ui/react';
import { PlaylistsManager } from '../modules/PlaylistsManager/PlaylistsManager';
import { signIn, useSession } from 'next-auth/react';
import { useCallback } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const onSignInClick = useCallback(() => {
    signIn();
  }, []);

  return (
    <Box py={4}>
      {session ? (
        <PlaylistsManager />
      ) : (
        <Flex h="90vh" justifyContent="center" alignItems="center">
          <VStack>
            <Heading>Sign in with spotify</Heading>
            <Button size="lg" onClick={onSignInClick}>
              Sign in
            </Button>
          </VStack>
        </Flex>
      )}
    </Box>
  );
};

export default Home;
