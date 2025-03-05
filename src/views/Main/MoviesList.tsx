import { Flex, Grid } from '@chakra-ui/react';
import api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { SingleMovie } from './SingleMovie';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export const MoviesList = ({ searchParams }) => {
  const { data, error, isPending, refetch } = useQuery(api.MoviesLibrary.FetchMoviesListQuery(searchParams));

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  if (isPending)
    return (
      <Grid templateColumns='repeat(3, 1fr)' gap='6'>
        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='400px' minW={'300px'} />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='400px' />
          <SkeletonText noOfLines={1} />
        </Flex>

        <Flex flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
          <Skeleton height='400px' />
          <SkeletonText noOfLines={1} />
        </Flex>
      </Grid>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Grid templateColumns='repeat(3, 1fr)' gap='6'>
        {data.results.map(movie => (
          <SingleMovie key={`${movie.id}`} movie={movie} />
        ))}
      </Grid>
    );
};
