import { Link } from 'react-router';
import { Card, Image, Text } from '@chakra-ui/react';
import type { Movie } from '@/api/movies';

interface SingleMovieProps {
  movie: Movie;
}

export const SingleMovie = ({ movie }: SingleMovieProps) => (
  <Link to={`/movie/${movie.id}`}>
    <Card.Root maxW='sm' overflow='hidden'>
      {movie.poster_path ? (
        <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
      ) : (
        <Image src={`https://placehold.co/200x300`} />
      )}

      <Card.Body p={'0.5rem'}>
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
