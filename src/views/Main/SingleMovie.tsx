import { Link } from 'react-router';
import { AbsoluteCenter, Card, Image, ProgressCircle, Text } from '@chakra-ui/react';
import type { Movie } from '@/api/movies';

interface SingleMovieProps {
  movie: Movie;
}

export const SingleMovie = ({ movie }: SingleMovieProps) => (
  <Link to={`/movie/${movie.id}`}>
    <Card.Root
      maxW='sm'
      h={'100%'}
      border={'solid 0.25rem transparent'}
      shadow={{ base: 'sm', _hover: 'md' }}
      overflow='hidden'
      transition='box-shadow 300ms ease-in-out'
      alignItems={'start'}
    >
      <Image
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : `https://placehold.co/200x300`}
        alt={`${movie.title} poster`}
        borderRadius={'0.25rem 0.25rem 0 0'}
      />

      <Card.Body p={'1.5rem 0.5rem 0 0.5rem'} alignItems={'start'} position={'relative'}>
        <ProgressCircle.Root
          size={'md'}
          position={'absolute'}
          top={'-1.25rem'}
          left={'0.5rem'}
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
            <ProgressCircle.ValueText fontSize={'sm'} />
          </AbsoluteCenter>
        </ProgressCircle.Root>

        <Card.Title>{movie.title}</Card.Title>

        <Text textStyle='md' fontWeight='light'>
          {movie.release_date
            ? new Intl.DateTimeFormat('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(movie.release_date))
            : 'Not Announcement'}
        </Text>
      </Card.Body>
    </Card.Root>
  </Link>
);
