import { HStack, Button, Input } from '@chakra-ui/react';
import { fetchTracks } from '../../api';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from '../../../../hooks/useDebounce';

export const TracksSearch = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 600);
  const {} = useQuery(['TrackSearch', debouncedSearchText], () => fetchTracks({ query: searchText }), {
    enabled: !!debouncedSearchText,
  });

  const onSearchInputChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }, []);

  return (
    <HStack>
      <Input placeholder="Search for a track" onChange={onSearchInputChange} value={searchText} />
      <Button>Search</Button>
    </HStack>
  );
};
