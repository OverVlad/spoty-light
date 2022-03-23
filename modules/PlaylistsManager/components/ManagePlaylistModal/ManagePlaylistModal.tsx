import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { createPlaylist, updatePlaylist as updatePlaylistApi } from '../../api';
import { addPlaylist, selectPlaylist, updatePlaylist } from '../../playlistsSlice';
import { Playlist } from '../../../../types/Playlists';

type AddPlaylistModalProps = {
  isOpen: boolean;
  selectedPlaylist?: Playlist;
  onClose: () => void;
};

export const ManagePlaylistModal = ({ isOpen, onClose, selectedPlaylist }: AddPlaylistModalProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedPlaylist) {
      setName(selectedPlaylist.title);
      setDescription(selectedPlaylist.description || '');
    }
  }, [selectedPlaylist]);

  const { mutate, isLoading } = useMutation(
    (data: { playlist: { name: string; description?: string } }) => {
      return selectedPlaylist
        ? updatePlaylistApi({
            playlist: {
              ...selectedPlaylist,
              title: data.playlist.name,
              description: data.playlist.description,
            },
          })
        : createPlaylist(data);
    },
    {
      onSuccess: ({ data }) => {
        if (selectedPlaylist) {
          dispatch(updatePlaylist(data.playlist));
        } else {
          dispatch(addPlaylist(data.playlist));
          dispatch(selectPlaylist({ playlistId: data.playlist.id }));
        }

        toast({
          title: selectedPlaylist ? 'Playlist updated.' : 'Playlist created.',
          status: 'success',
        });

        onClose();
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
      onSettled: () => {
        if (!selectedPlaylist) {
          setName('');
          setDescription('');
        }
        onClose();
      },
    },
  );

  const onNameChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);

  const onDescriptionChange = useCallback((e: SyntheticEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ playlist: { name, description } });
    },
    [name, description, mutate],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Add new playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Playlist name" mb={3} required onChange={onNameChange} value={name} />
            <Textarea
              placeholder="Playlist description (optional). Max 250 char"
              resize="none"
              value={description}
              onChange={onDescriptionChange}
              maxLength={250}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
              {!!selectedPlaylist ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
