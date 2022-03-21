import { Text, Flex, Box, Heading, useColorMode, Switch, Button } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <Flex bg="gray.700" align="center" justify="space-between" color="white" p={4}>
      <Flex align="center" mr={6}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          Spoty light
        </Heading>
      </Flex>

      <Flex flex={1}>
        <Text fontWeight="bold">
          <Link href="/">Playlist</Link>
        </Text>
      </Flex>

      {session && (
        <Flex px={3}>
          <Button colorScheme="pink" onClick={() => signOut()}>
            Sign out
          </Button>
        </Flex>
      )}

      <Box>
        Dark mode <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Box>
    </Flex>
  );
};
