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
} from '@chakra-ui/react';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlaylist, selectPlaylist } from '../../playlistsSlice';
import { v4 as uuidv4 } from 'uuid';

type AddPlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPlaylistModal = ({ isOpen, onClose }: AddPlaylistModalProps) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onNameChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);

  const onDescriptionChange = useCallback((e: SyntheticEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const id = uuidv4();
      dispatch(addPlaylist({ title: name, description, id, songs: [] }));
      dispatch(selectPlaylist({ playlistId: id }));
      onClose();
    },
    [name, description, dispatch, onClose],
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
            <Button colorScheme="blue" mr={3} type="submit">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
