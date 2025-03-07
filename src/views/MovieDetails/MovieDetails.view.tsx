import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AbsoluteCenter, Flex, Heading, Image, ProgressCircle, Text } from '@chakra-ui/react';
import { Vibrant } from 'node-vibrant/browser';

import api from '@/api';
import { useEffect, useState } from 'react';

export const MovieDetailsView = () => {
  const { id } = useParams();
  const [palette, setPalette] = useState('');
  const { data: movie, isPending, isError, error } = useQuery(api.MoviesLibrary.FetchMovieQuery(id));

  useEffect(() => {
    if (movie) {
      Vibrant.from(`https://image.tmdb.org/t/p/w50_and_h50_face/${movie.poster_path}`)
        .getPalette()
        .then(palette => setPalette(palette.Muted?.hex ?? ''));
    }
  }, [movie]);

  if (isPending) return <p>Loading...</p>;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (movie && palette) {
    return (
      <Flex gap={'2rem'} p={'3rem 5rem'} bgColor={palette}>
        <Image
          borderRadius={'0.25rem'}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <Flex flexDirection={'column'} alignItems={'start'} justifyContent={'end'} color={'fg.inverted'}>
          <Heading size={'4xl'} fontWeight={'bold'} mb={'.25rem'}>
            {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'NA'})
          </Heading>

          <Flex gap={'5px'} mb={'1rem'}>
            {movie.genres.map(g => (
              <Link key={g.id} to={`/genres/${g.id}`}>
                {g.name}
              </Link>
            ))}

            <Text textStyle='md'>
              {Math.floor(movie.runtime / 60) > 0 && `${Math.floor(movie.runtime / 60)}h `}
              {`${movie.runtime % 60}m`}
            </Text>
          </Flex>

          <Text textStyle='sm' textAlign={'start'} mb={'1rem'} maxW={'30rem'}>
            {movie.overview}
          </Text>

          <Flex alignItems={'center'} gap={'0.5rem'}>
            <ProgressCircle.Root
              size={'md'}
              colorPalette={
                movie.vote_average ? (movie.vote_average > 6 ? 'green' : movie.vote_average > 5 ? 'orange' : 'red') : 'gray'
              }
              value={movie.vote_average ? movie.vote_average * 10 : 0}
            >
              <ProgressCircle.Circle zIndex={'1'} css={{ '--thickness': '0.25rem' }}>
                <ProgressCircle.Track />
                <ProgressCircle.Range strokeLinecap='round' />
              </ProgressCircle.Circle>
              <AbsoluteCenter bg={'white'} w={'100%'} h={'100%'} borderRadius={'50%'} shadow={'sm'}>
                <ProgressCircle.ValueText fontSize={'sm'} color={'black'} />
              </AbsoluteCenter>
            </ProgressCircle.Root>

            <Text textStyle='md' lineHeight={'1rem'} textAlign={'start'} fontWeight={'600'}>
              User Score
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return <>Movie not found</>;
};
