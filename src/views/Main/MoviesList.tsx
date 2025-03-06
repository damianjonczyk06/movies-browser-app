import { Button, Flex, Grid } from '@chakra-ui/react';
import api from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SingleMovie } from './SingleMovie';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export const MoviesList = ({ searchParams }: { searchParams: string }) => {
  const { data, error, isPending, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    api.MoviesLibrary.FetchMoviesListQuery(searchParams),
  );

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  if (isPending)
    return (
      <Grid templateColumns='repeat(3, 1fr)' gap='6'>
        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='300px' width='200px' minWidth={'100px'} />
          <SkeletonText noOfLines={1} />
        </Flex>
      </Grid>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    return (
      <Flex flexDirection={'column'} gap={'2rem'}>
        <Grid templateColumns='repeat(3, 1fr)' gap='6'>
          {data.pages.map(page => page.results.map(movie => <SingleMovie key={`${movie.id}`} movie={movie} />))}
        </Grid>

        {hasNextPage && (
          <Button color={'black'} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </Flex>
    );
  }
};
