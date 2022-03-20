import { HStack, Button, Input } from '@chakra-ui/react';

export const SongsSearch = () => {
  return (
    <HStack>
      <Input placeholder="Search for a track" />
      <Button>Search</Button>
    </HStack>
  );
};
