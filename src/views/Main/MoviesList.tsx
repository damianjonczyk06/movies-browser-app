import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { SingleMovie } from './SingleMovie';

import { Box, Flex, Grid, ProgressCircle } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

import api from '@/api';

export const MoviesList = ({ searchParams }: { searchParams: string }) => {
  const { ref, inView } = useInView();
  const { data, error, isPending, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    api.MoviesLibrary.FetchMoviesListQuery(searchParams),
  );

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending)
    return (
      <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='6' w={'100%'}>
        {[...Array(9)].map((_, index) => (
          <Box key={index} display='flex' flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
            <Skeleton h='300px' w={'100%'} />
            <SkeletonText noOfLines={1} />
          </Box>
        ))}
      </Grid>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    return (
      <Flex flexDirection={'column'} gap={'2rem'} w={'100%'}>
        <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='6' w={'100%'}>
          {data.pages.map(page => page.results.map(movie => <SingleMovie key={`${movie.id}`} movie={movie} />))}
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
