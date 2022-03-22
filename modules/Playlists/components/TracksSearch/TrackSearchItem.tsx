import { Track } from '../../../../types/Playlists';
import { Flex, HStack, IconButton, Image, ListItem, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useCallback } from 'react';

type TrackSearchItemProps = {
  onTrackAdd: (track: Track) => void;
  track: Track;
};

export const TrackSearchItem = ({ track, onTrackAdd }: TrackSearchItemProps) => {
  const onClick = useCallback(() => {
    onTrackAdd(track);
  }, [track, onTrackAdd]);

  return (
    <ListItem m={3} border="1px solid" p={1} borderRadius="md">
      <HStack>
        <Image src={track.album.images[0].url} w={50} h={50} alt={track.name} mr={4} />
        <Flex title={track.name} h={50} overflow="hidden" textOverflow="ellipsis" alignItems="center">
          <Text fontSize="sm">{track.name}</Text>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <IconButton colorScheme="blue" icon={<AddIcon />} aria-label="Add track to playlist" onClick={onClick} />
        </Flex>
      </HStack>
    </ListItem>
  );
};
