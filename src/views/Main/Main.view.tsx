import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { MoviesList } from './MoviesList';
import { Filters } from './Filters';
import { Sort } from './Sort';
import { SearchParams } from '@/api/movies';

export const MainView = () => {
  const [sortValue, setSortValue] = useState<string>('popularity.desc');
  const [filterValue, setFilterValues] = useState<SearchParams>({ with_genres: [], 'vote_average.gte': '5' });
  const searchParams = new URLSearchParams({
    sort_by: sortValue,
    'vote_average.gte': filterValue['vote_average.gte'] || '',
    with_genres: filterValue.with_genres.join(','),
  });

  return (
    <Flex gap={'2rem'} justifyContent={'center'} mt={'1rem'} p={'0 3rem'}>
      <Flex flexDirection={'column'} gap={'2rem'}>
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <Filters filterValue={filterValue} setFilterValue={setFilterValues} />
      </Flex>
      <MoviesList searchParams={searchParams.toString()} />
    </Flex>
  );
};
