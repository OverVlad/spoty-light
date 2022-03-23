import { Box, List, useColorMode, useToast } from '@chakra-ui/react';
import { Track } from '../../../../types/Playlists';
import { useCallback } from 'react';
import { addTrack, playlistSelectors, removeTrack } from '../../playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TrackSearchItem } from './TrackSearchItem';
import { useMutation } from 'react-query';
import { addTrackToPlaylist, removePlaylistTrack } from '../../api';

type TrackSearchContainerProps = {
  tracks: Track[];
};

export const TrackSearchContainer = ({ tracks }: TrackSearchContainerProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { mutate: addTrackMutate } = useMutation(addTrackToPlaylist, {
    onMutate: ({ track, playlistId }) => {
      dispatch(addTrack({ playlistId: playlistId, track: track }));
    },
    onError: (_, { playlistId, track }) => {
      dispatch(removeTrack({ playlistId: playlistId, trackId: track.id }));
      toast({
        title: 'An error occurred. Try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  const onTrackAdd = useCallback(
    (track: Track) => {
      if (selectedPlaylist) {
        addTrackMutate({ track, playlistId: selectedPlaylist.id });
      } else {
        toast({
          title: 'Choose playlist to add track',
          status: 'warning',
          duration: 1000,
        });
      }
    },
    [addTrackMutate, selectedPlaylist, toast],
  );

  const { mutate: removeTrackMutate } = useMutation(removePlaylistTrack, {
    onSuccess: (_, { playlistId, tracks }) => {
      dispatch(removeTrack({ playlistId: playlistId, trackId: tracks[0].id }));
    },
  });

  const onTrackDelete = useCallback(
    (track: Track) => {
      if (selectedPlaylist) {
        removeTrackMutate({ playlistId: selectedPlaylist.id, tracks: [track] });
      } else {
        toast({
          title: 'Choose playlist to add track',
          status: 'warning',
          duration: 1000,
        });
      }
    },
    [selectedPlaylist, removeTrackMutate, toast],
  );

  return (
    <Box
      pos="absolute"
      w="100%"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      h={300}
      overflowY="scroll"
      zIndex={1}
      mt={2}
      borderRadius="md"
    >
      <List>
        {tracks.map((track) => (
          <TrackSearchItem
            key={track.id}
            track={track}
            onTrackAdd={onTrackAdd}
            onTrackDelete={onTrackDelete}
            isSelected={!!selectedPlaylist?.tracks.find((t) => t.id === track.id)}
          />
        ))}
      </List>
    </Box>
  );
};
