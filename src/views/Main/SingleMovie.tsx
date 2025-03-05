import { Link } from 'react-router';
import { Flex, Heading, Image } from '@chakra-ui/react';
import type { Movie } from '@/api/movies';

interface SingleMovieProps {
  movie: Movie;
}

export const SingleMovie = ({ movie }: SingleMovieProps) => (
  <Link to={`/movie/${movie.id}`}>
    <Flex flexDirection={'column'}>
      <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
      <Heading size={'md'}>
        {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'NR'})
      </Heading>
    </Flex>
  </Link>
);
