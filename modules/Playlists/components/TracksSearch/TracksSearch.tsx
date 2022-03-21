import { HStack, Button, Input } from '@chakra-ui/react';
import { fetchTracks } from '../../api';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';

export const TracksSearch = () => {
  const [searchText, setSearchText] = useState('');
  const { mutate } = useMutation((searchText: string) => fetchTracks({ query: searchText }));

  const onSearchInputChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }, []);

  const onSearchClick = useCallback(() => {
    mutate(searchText);
  }, [searchText]);

  return (
    <HStack>
      <Input placeholder="Search for a track" onChange={onSearchInputChange} value={searchText} />
      <Button onClick={onSearchClick}>Search</Button>
    </HStack>
  );
};
