import { Box, List, useToast } from '@chakra-ui/react';
import { Track } from '../../../../types/Playlists';
import { useCallback } from 'react';
import { addTrack, playlistSelectors, removeTrack } from '../../playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TrackSearchItem } from './TrackSearchItem';

type TrackSearchContainerProps = {
  tracks: Track[];
};

export const TrackSearchContainer = ({ tracks }: TrackSearchContainerProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  const onTrackAdd = useCallback(
    (track: Track) => {
      if (selectedPlaylist) {
        dispatch(addTrack({ playlistId: selectedPlaylist.id, track }));
      } else {
        toast({
          title: 'Choose playlist to add track',
          status: 'warning',
          duration: 1000,
        });
      }
    },
    [selectedPlaylist, dispatch, toast],
  );

  const onTrackDelete = useCallback(
    (trackId: string) => {
      if (selectedPlaylist) {
        dispatch(removeTrack({ playlistId: selectedPlaylist.id, trackId }));
      } else {
        toast({
          title: 'Choose playlist to add track',
          status: 'warning',
          duration: 1000,
        });
      }
    },
    [selectedPlaylist, dispatch, toast],
  );

  return (
    <Box pos="absolute" w="100%" bg="gray.100" h={300} overflowY="scroll" zIndex={1} mt={2} borderRadius="md">
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
