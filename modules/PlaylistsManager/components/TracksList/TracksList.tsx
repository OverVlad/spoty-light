import { List, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack, playlistSelectors, removeTrack } from '../../playlistsSlice';
import { useCallback } from 'react';
import { TrackItem } from './TrackItem';
import { useMutation } from 'react-query';
import { removePlaylistTrack } from '../../api';
import { Track } from '../../../../types/Playlists';

export const TracksList = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const { mutate, isLoading } = useMutation(removePlaylistTrack, {
    onMutate: ({ playlistId, tracks }) => {
      dispatch(removeTrack({ playlistId: playlistId, trackId: tracks[0].id }));
    },
    onError: (_, { playlistId, tracks }) => {
      toast({
        title: 'Cannot remove the track.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      const track = tracks[0];

      dispatch(addTrack({ playlistId, track }));
    },
  });

  const onTrackRemove = useCallback(
    (track: Track) => {
      if (selectedPlaylist) {
        mutate({ playlistId: selectedPlaylist.id, tracks: [track] });
      }
    },
    [selectedPlaylist, mutate],
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
        <TrackItem key={track.id} track={track} onTrackRemove={onTrackRemove} isLoading={isLoading} />
      ))}
    </List>
  );
};
