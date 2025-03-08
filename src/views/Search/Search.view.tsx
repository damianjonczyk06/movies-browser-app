import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams, useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Button, Flex, Grid, Heading, ProgressCircle } from '@chakra-ui/react';
import { SkeletonGrid } from '@/components/SkeletonGrid';
import { SingleMovie } from '../Main/SingleMovie';
import { ArrowBack } from '@/components/ArrowBack';
import { ErrorPage } from '@/components/ErrorPage';

import api from '@/api';

const SearchView = () => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending, isError } = useInfiniteQuery(
    api.MoviesLibrary.SearchMoviesListQuery(searchParams.get('query') ?? '')
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) return <SkeletonGrid />;
  if (isError) return <ErrorPage />;
  if (data) {
    return (
      <Flex position={'relative'} flexDirection={'column'} gap={'2rem'} w={'100%'} p={'3rem'}>
        <Button
          fontSize={'md'}
          fontWeight={'light'}
          background={{ base: 'transparent', _hover: 'transparent' }}
          color={{ base: 'white', _hover: 'white' }}
          textDecoration={{ base: 'none', _hover: 'underline 2px solid white' }}
          position={'absolute'}
          top={'0.25rem'}
          left={{ base: '3.5rem', _hover: '3rem' }}
          transition={'left 200ms ease-in-out'}
          onClick={() => navigate(-1)}
        >
          <ArrowBack color='black' />
        </Button>
        <Grid
          templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 250px))' }}
          justifyContent={'center'}
          gap='6'
          w={'100%'}
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
