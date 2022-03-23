import { Track } from '../../../../types/Playlists';
import { Flex, HStack, IconButton, Image, ListItem, Text } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useCallback } from 'react';

type TrackSearchItemProps = {
  onTrackAdd: (track: Track) => void;
  onTrackDelete: (trackId: string) => void;
  track: Track;
  isSelected?: boolean;
};

export const TrackSearchItem = ({ track, onTrackAdd, isSelected, onTrackDelete }: TrackSearchItemProps) => {
  const onAddTrackClick = useCallback(() => {
    onTrackAdd(track);
  }, [track, onTrackAdd]);

  const onDeleteTrackClick = useCallback(() => {
    onTrackDelete(track.id);
  }, [track, onTrackDelete]);

  return (
    <ListItem m={3} p={1} border="1px solid" borderColor="gray.500" borderRadius="md">
      <HStack>
        <Image src={track.album.images[0].url} w={50} h={50} alt={track.name} mr={4} />
        <Flex title={track.name} h={50} overflow="hidden" textOverflow="ellipsis" alignItems="center">
          <Text fontSize="sm">{track.name}</Text>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          {isSelected ? (
            <IconButton
              colorScheme="red"
              icon={<DeleteIcon />}
              aria-label="Remove track to playlist"
              onClick={onDeleteTrackClick}
            />
          ) : (
            <IconButton
              colorScheme="blue"
              icon={<AddIcon />}
              aria-label="Add track to playlist"
              onClick={onAddTrackClick}
            />
          )}
        </Flex>
      </HStack>
    </ListItem>
  );
};
