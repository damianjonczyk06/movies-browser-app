import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import api from '@/api';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';

export const MovieDetailsView = () => {
  const { id } = useParams();
  const { data: movie, isPending, isError, error } = useQuery(api.MoviesLibrary.FetchMovieQuery(id));

  if (isPending) return <p>Loading...</p>;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (movie) {
    return (
      <Flex gap={'15px'}>
        <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
        <Flex flexDirection={'column'}>
          <Heading size={'md'}>
            {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'NR'})
          </Heading>
          <Flex gap={'5px'}>
            {movie.genres.map(g => (
              <Link key={g.id} to={`/genres/${g.id}`}>
                {g.name}
              </Link>
            ))}
          </Flex>
          <Text textStyle='md'>{movie.tagline}</Text>
          <Heading size={'sm'}>Overview</Heading>
          <Text textStyle='sm'>{movie.overview}</Text>
        </Flex>
      </Flex>
    );
  }

  return <>Movie not found</>;
};
