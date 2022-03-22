import { Box, List } from '@chakra-ui/react';
import { Track } from '../../../../types/Playlists';
import { useCallback } from 'react';
import { addTrack, playlistSelectors } from '../../playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TrackSearchItem } from './TrackSearchItem';

type TrackSearchContainerProps = {
  tracks: Track[];
};

export const TrackSearchContainer = ({ tracks }: TrackSearchContainerProps) => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  const onTrackAdd = useCallback(
    (track: Track) => {
      if (selectedPlaylist) {
        dispatch(addTrack({ playlistId: selectedPlaylist.id, track }));
      }
    },
    [selectedPlaylist, dispatch],
  );

  return (
    <Box pos="absolute" w="100%" bg="gray.100" h={300} overflowY="scroll" zIndex={1} mt={2} borderRadius="md">
      <List>
        {tracks.map((track) => (
          <TrackSearchItem key={track.id} track={track} onTrackAdd={onTrackAdd} />
        ))}
      </List>
    </Box>
  );
};
