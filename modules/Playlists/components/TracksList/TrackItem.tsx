import { Box, HStack, IconButton, Image, ListItem, Text, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Track } from '../../../../types/Playlists';
import { useCallback } from 'react';

type TrackItemProps = {
  track: Track;
  onTrackRemove: (trackId: string) => void;
};

export const TrackItem = ({ track, onTrackRemove }: TrackItemProps) => {
  const onRemove = useCallback(() => {
    onTrackRemove(track.id);
  }, [track, onTrackRemove]);

  return (
    <ListItem p={3} border="1px" borderRadius="md" borderColor="gray.200">
      <HStack justifyContent="space-between">
        <HStack>
          <Image w="50px" h="50px" src={track.album.images[0].url} alt={`${track.name} image`} mr={3} />

          <VStack alignItems="flex-start">
            <Text fontWeight="bold">{track.name}</Text>
            <Text>{track.artist.map((a) => a.name).join(', ')}</Text>
          </VStack>
        </HStack>

        <Text>{track.album.name}</Text>

        <Text>{track.album.release_date}</Text>

        <Box>
          <IconButton icon={<DeleteIcon />} aria-label="Delete song" onClick={onRemove} />
        </Box>
      </HStack>
    </ListItem>
  );
};
