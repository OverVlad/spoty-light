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
import { SyntheticEvent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../api';
import { addPlaylist, selectPlaylist } from '../../playlistsSlice';

type AddPlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPlaylistModal = ({ isOpen, onClose }: AddPlaylistModalProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isLoading } = useMutation(createPlaylist, {
    onSuccess: ({ data }) => {
      dispatch(addPlaylist(data.playlist));
      dispatch(selectPlaylist({ playlistId: data.playlist.id }));
    },
    onSettled: () => {
      setName('');
      setDescription('');
      toast({
        title: 'Playlist created.',
        status: 'success',
      });
      onClose();
    },
  });

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
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
