import { useState } from 'react';

import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { MoviesList } from './MoviesList';
import { Filters } from './Filters';
import { Sort } from './Sort';

import type { SearchParams } from '@/api/movies';

const defaultFilters = {
  with_genres: [],
  'vote_average.gte': '6',
  'vote_average.lte': '10',
  'with_runtime.gte': '0',
  'with_runtime.lte': '400',
};

export const MainView = () => {
  const [sortValue, setSortValue] = useState<string>('popularity.desc');
  const [filterValue, setFilterValues] = useState<SearchParams>(defaultFilters);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const searchParams = new URLSearchParams({
    sort_by: sortValue,
    'vote_average.gte': filterValue['vote_average.gte'] ?? '',
    'vote_average.lte': filterValue['vote_average.lte'] ?? '',
    'with_runtime.gte': filterValue['with_runtime.gte'] ?? '',
    'with_runtime.lte': filterValue['with_runtime.lte'] ?? '',
    with_genres: filterValue.with_genres.join(','),
  });

  return (
    <Flex flexDirection={isMobile ? 'column' : 'row'} gap={'2rem'} justifyContent={'center'} mt={'1rem'} p={' 0 1rem'}>
      <Flex flexDirection={'column'} gap={'2rem'} w={'100%'} maxW={isMobile ? '100%' : '18rem'}>
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <Filters filterValue={filterValue} setFilterValue={setFilterValues} defaultFilters={defaultFilters} />
      </Flex>

      <MoviesList searchParams={searchParams.toString()} />
    </Flex>
  );
};
