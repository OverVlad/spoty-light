import { List, Alert, AlertIcon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelectors, removeTrack } from '../../playlistsSlice';
import { useCallback } from 'react';
import { TrackItem } from './TrackItem';

export const TracksList = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  const onTrackRemove = useCallback(
    (trackId: string) => {
      if (selectedPlaylist) {
        dispatch(removeTrack({ playlistId: selectedPlaylist.id, trackId }));
      }
    },
    [dispatch, selectedPlaylist],
  );

  if (!selectedPlaylist) {
    return (
      <Alert status="info">
        <AlertIcon />
        Select playlist to see tracks
      </Alert>
    );
  }

  if (selectedPlaylist.tracks.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No song added. You can add songs in the song search
      </Alert>
    );
  }

  return (
    <List spacing={3}>
      {selectedPlaylist.tracks.map((track) => (
        <TrackItem key={track.id} track={track} onTrackRemove={onTrackRemove} />
      ))}
    </List>
  );
};
