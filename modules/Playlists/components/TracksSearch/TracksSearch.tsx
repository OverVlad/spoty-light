import { HStack, Button, Input, Box } from '@chakra-ui/react';
import { fetchTracks } from '../../api';
import { KeyboardEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { ApiErrorType } from '../../../../types/api';
import { TrackSearchContainer } from './TrackSearchContainer';

export const TracksSearch = () => {
  const toast = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { mutate, isLoading, data } = useMutation((searchText: string) => fetchTracks({ query: searchText }), {
    onError: (err: ApiErrorType) => {
      toast({
        title: err.message,
        status: 'error',
      });
    },
  });

  const onSearchInputChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }, []);

  const onSearchClick = useCallback(() => {
    mutate(searchText);
    setIsOpen(true);
  }, [mutate, searchText]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !!searchText) {
        onSearchClick();
      }
    },
    [onSearchClick, searchText],
  );

  const onInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        event.stopPropagation();
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box pos="relative" ref={containerRef}>
      <HStack pos="relative">
        <Input
          placeholder="Search for a track"
          onChange={onSearchInputChange}
          value={searchText}
          onKeyDown={handleKeyDown}
          onFocus={onInputFocus}
        />
        <Button onClick={onSearchClick} isLoading={isLoading} isDisabled={!searchText}>
          Search
        </Button>
      </HStack>

      {isOpen && data && <TrackSearchContainer tracks={data.data.tracks} />}
    </Box>
  );
};
