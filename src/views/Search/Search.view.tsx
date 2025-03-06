import api from '@/api';
import { Flex, Grid } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import { SingleMovie } from '../Main/SingleMovie';

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending, error } = useInfiniteQuery(
    api.MoviesLibrary.SearchMoviesListQuery(searchParams.get('query') ?? ''),
  );

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    return (
      <Flex flexDirection={'column'}>
        <Link to={'/'} className='button'>
          Back to main page
        </Link>

        <Grid templateColumns='repeat(3, 1fr)' gap='6'>
          {data.pages.map(page => page.results.map(movie => <SingleMovie key={`${movie.id}`} movie={movie} />))}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          )}
        </Grid>
      </Flex>
    );
  }
};
