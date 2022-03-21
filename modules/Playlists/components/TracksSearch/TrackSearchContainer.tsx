import { Box, Flex, HStack, IconButton, Image, List, ListItem, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Track } from '../../../../types/Playlists';

type TrackSearchContainerProps = {
  tracks: Track[];
};

export const TrackSearchContainer = ({ tracks }: TrackSearchContainerProps) => {
  return (
    <Box pos="absolute" w="100%" bg="gray.100" h={300} overflowY="scroll" zIndex={1} mt={2} borderRadius="md">
      <List>
        {tracks.map((track) => (
          <ListItem key={track.id} m={3} border="1px solid" p={1} borderRadius="md">
            <HStack>
              <Image src={track.album.images[0].url} w={50} h={50} alt={track.name} mr={4} />
              <Flex title={track.name} h={50} overflow="hidden" textOverflow="ellipsis" alignItems="center">
                <Text fontSize="sm">{track.name}</Text>
              </Flex>
              <Flex flex={1} justifyContent="flex-end">
                <IconButton colorScheme="blue" icon={<AddIcon />} aria-label="Add track to playlist" />
              </Flex>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
