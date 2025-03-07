import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Flex, Grid, ProgressCircle } from '@chakra-ui/react';
import { SkeletonGrid } from '@/components/SkeletonGrid';
import { SingleMovie } from '../Main/SingleMovie';

import api from '@/api';

const SearchView = () => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending, error } = useInfiniteQuery(
    api.MoviesLibrary.SearchMoviesListQuery(searchParams.get('query') ?? '')
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) return <SkeletonGrid />;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    return (
      <Flex flexDirection={'column'} gap={'2rem'} w={'100%'} p={'3rem'}>
        <Grid
          templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 250px))' }}
          justifyContent={'center'}
          gap='6'
          w={'100%'}
        >
          {data.pages.map((page) => page.results.map((movie) => <SingleMovie key={movie.id} movie={movie} />))}
        </Grid>

        {hasNextPage && (
          <Flex ref={ref} justifyContent={'center'} alignItems={'center'} h={'8rem'}>
            {isFetchingNextPage && (
              <ProgressCircle.Root value={null} size='md'>
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range strokeLinecap='round' />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            )}
          </Flex>
        )}
      </Flex>
    );
  }
};

export default SearchView;
