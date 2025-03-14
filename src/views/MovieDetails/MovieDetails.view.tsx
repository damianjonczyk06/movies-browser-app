import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Vibrant } from 'node-vibrant/browser';

import { AbsoluteCenter, Box, Button, Flex, Heading, Image, ProgressCircle, Text } from '@chakra-ui/react';
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton';
import { ArrowBack } from '@/components/ArrowBack';
import { ErrorPage } from '@/components/ErrorPage';
import { Credits } from './Credits';

import api from '@/api';

const MovieDetailsView = () => {
  const { id } = useParams();
  if (!id) throw new Error('ID is empty');

  const navigate = useNavigate();
  const [palette, setPalette] = useState('');
  const { data: movie, isPending, isError } = useQuery(api.MoviesLibrary.FetchMovieQuery(id));

  useEffect(() => {
    if (movie) {
      Vibrant.from(
        movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w50_and_h50_face/${movie.backdrop_path}`
          : movie.poster_path
            ? `https://image.tmdb.org/t/p/w50_and_h50_face/${movie.poster_path}`
            : `https://placehold.co/140x180`
      )
        .getPalette()
        .then((palette) => setPalette(palette.Muted?.hex ?? ''));
    }
  }, [movie]);

  if (isPending) return <MovieDetailsSkeleton />;
  if (isError) return <ErrorPage />;

  if (movie && palette) {
    return (
      <Flex flexDirection={'column'}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          position={'relative'}
          gap={'2rem'}
          p={{ base: '5rem 1rem 3rem 1rem', md: '5rem 5rem 3rem 5rem' }}
          background={
            movie.backdrop_path
              ? `url('https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.backdrop_path}')`
              : `url('https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.poster_path}')`
          }
          backgroundPosition='left calc((50vw + 150px) - 500px) top'
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          zIndex='2'
        >
          <Button
            fontSize={'md'}
            fontWeight={'light'}
            background={{ base: 'transparent', _hover: 'transparent' }}
            color={{ base: 'white', _hover: 'white' }}
            textDecoration={{ base: 'none', _hover: 'underline 2px solid white' }}
            position={'absolute'}
            top={'1.25rem'}
            left={{ base: '-0.5rem', md: { _hover: '3rem', base: '3.5rem' } }}
            transition={'left 200ms ease-in-out'}
            onClick={() => navigate(-1)}
          >
            <ArrowBack color='white' />
          </Button>
          <Box
            position='absolute'
            top='0'
            left='0'
            width='100%'
            height='100%'
            background={`linear-gradient(90deg, ${palette} 0%, ${palette} 50%, ${palette}10 100%)`}
            backdropFilter='blur(7px)'
            zIndex='-1'
          />
          <Image
            borderRadius={'0.25rem'}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://placehold.co/500`}
            alt={`${movie.title} poster`}
            height={'500px'}
            maxWidth={'330px'}
            shadow={'xl'}
          />
          <Flex flexDirection={'column'} alignItems={'start'} justifyContent={'end'} color={'white'}>
            <Heading size={'4xl'} fontWeight={'bold'} mb={'.25rem'}>
              {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'NA'})
            </Heading>

            <Flex gap={'10px'} mb={'1rem'} wrap={'wrap'} flexShrink={'0'}>
              {movie.genres.map((g) => (
                <Text key={g.id}>{g.name}</Text>
              ))}
              <Flex flexDir={'row'} gap={'0.5rem'}>
                &bull;
                <Text textStyle='md'>
                  {Math.floor(movie.runtime / 60) > 0 && `${Math.floor(movie.runtime / 60)}h `}
                  {`${movie.runtime % 60}m`}
                </Text>
              </Flex>
            </Flex>

            <Text textStyle='sm' textAlign={'start'} mb={'1rem'} minW={'10rem'} maxW={'30rem'}>
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
                  <ProgressCircle.ValueText fontSize={'xs'} color={'black'} />
                </AbsoluteCenter>
              </ProgressCircle.Root>

              <Text textStyle='md' lineHeight={'1rem'} textAlign={'start'} fontWeight={'600'}>
                User Score
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Credits />
      </Flex>
    );
  }
};

export default MovieDetailsView;
