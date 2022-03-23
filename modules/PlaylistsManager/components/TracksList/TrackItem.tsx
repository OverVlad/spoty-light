import { Box, Flex, HStack, IconButton, Image, ListItem, Text, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Track } from '../../../../types/Playlists';
import { useCallback } from 'react';

type TrackItemProps = {
  track: Track;
  isLoading?: boolean;
  onTrackRemove: (track: Track) => void;
};

export const TrackItem = ({ track, onTrackRemove, isLoading }: TrackItemProps) => {
  const onRemove = useCallback(() => {
    onTrackRemove(track);
  }, [track, onTrackRemove]);

  return (
    <ListItem p={3} border="1px" borderRadius="md" borderColor="gray.200">
      <HStack justifyContent="space-between">
        <HStack flex={{ base: 1, md: 0.6 }}>
          <Image w="50px" h="50px" src={track.album.images[0].url} alt={`${track.name} image`} mr={3} />

          <VStack alignItems="flex-start">
            <Text fontWeight="bold">{track.name}</Text>
            <Text>{track.artist.map((a) => a.name).join(', ')}</Text>
          </VStack>
        </HStack>

        <Flex flexDirection={{ base: 'column', md: 'row' }} flex={1} alignItems="center">
          <Text mb={{ base: 3, md: 0 }} flex={1}>
            {track.album.name}
          </Text>

          <Text flex={1}>{track.album.release_date}</Text>
        </Flex>

        <Box>
          <IconButton isLoading={isLoading} icon={<DeleteIcon />} aria-label="Delete song" onClick={onRemove} />
        </Box>
      </HStack>
    </ListItem>
  );
};
