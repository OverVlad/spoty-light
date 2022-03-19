import { Text, Flex, Box, Heading, useColorMode, Switch } from '@chakra-ui/react';
import Link from 'next/link';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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

      <Box>
        Dark mode <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Box>
    </Flex>
  );
};
