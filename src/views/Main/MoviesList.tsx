import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Flex, Grid, Heading, ProgressCircle } from '@chakra-ui/react';
import { SkeletonGrid } from '@/components/SkeletonGrid';
import { SingleMovie } from './SingleMovie';
import { ErrorPage } from '@/components/ErrorPage';

import api from '@/api';

export const MoviesList = ({ searchParams }: { searchParams: string }) => {
  const { ref, inView } = useInView();
  const { data, isError, isPending, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    api.MoviesLibrary.FetchMoviesListQuery(searchParams)
  );

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) return <SkeletonGrid />;
  if (isError) return <ErrorPage />;

  if (data) {
    return (
      <Flex flexDirection={'column'} gap={'2rem'} w={'100%'}>
        <Grid
          templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 250px))' }}
          justifyContent={'center'}
          gap='6'
          w={'100%'}
          p={{ base: '0', md: '0 1rem' }}
        >
          {data.pages[0].results.length ? (
            data.pages.map((page) => page.results.map((movie, idx) => <SingleMovie key={`${movie.id}-${idx}`} movie={movie} />))
          ) : (
            <Heading>Sorry, no results</Heading>
          )}
        </Grid>

        {hasNextPage && (
          <Flex ref={ref} justifyContent={'center'} alignItems={'center'} h={'8rem'}>
            {isFetchingNextPage && (
              <ProgressCircle.Root value={null} size='sm'>
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
