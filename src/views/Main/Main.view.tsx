import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { MoviesList } from './MoviesList';
import { Filters } from './Filters';
import { Sort } from './Sort';

export const MainView = () => {
  const [sortValue, setSortValue] = useState('popularity.desc');
  const [filterValue, setFilterValues] = useState({ with_genres: [], 'vote_average.gte': 1 });
  const params = new URLSearchParams({ sort_by: sortValue, ...filterValue });

  return (
    <Flex gap={'10px'}>
      <Flex flexDirection={'column'} gap={'30px'}>
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <Filters filterValue={filterValue} setFilterValue={setFilterValues} />
      </Flex>
      <MoviesList searchParams={params.toString()} />
    </Flex>
  );
};
