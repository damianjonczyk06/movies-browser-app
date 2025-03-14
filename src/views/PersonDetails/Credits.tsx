import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Box, Card, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { SkeletonText } from '@/components/ui/skeleton';

import api from '@/api';

export const Credits = () => {
  const { id } = useParams();
  if (!id) throw new Error('ID is empty');

  const { data, isPending, error } = useQuery(api.MoviesLibrary.FetchPersonCreditsQuery(id));

  if (isPending)
    return (
      <Box p={'2.5rem'}>
        <SkeletonText noOfLines={1} w={'100px'} />

        <Flex gap={'1rem'} p={'1rem 1px'}>
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
        </Flex>
      </Box>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Box p={'2.5rem'}>
        <Heading>Movies:</Heading>

        <Flex p={'1rem 1px'} width={'100%'} gap={'1rem'} overflowX={'auto'}>
          {data?.cast.length
            ? data?.cast.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <Card.Root
                    flexDirection={'column'}
                    w={'100%'}
                    h={'100%'}
                    minW={'200px'}
                    border={'solid 0.25rem transparent'}
                    shadow={{ base: 'sm', _hover: 'md' }}
                    overflow='hidden'
                    transition='box-shadow 300ms ease-in-out'
                    alignItems={'start'}
                  >
                    <Image
                      src={
                        movie.poster_path
                          ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${movie.poster_path}`
                          : `https://placehold.co/140x180`
                      }
                      alt={`${movie.title} poster`}
                      minW={'100%'}
                      maxH={'240px'}
                      h={'100%'}
                      borderRadius={'0.25rem 0.25rem 0 0'}
                    />

                    <Card.Body p={'1.5rem 0.5rem 0 0.5rem'} alignItems={'start'} position={'relative'}>
                      <Card.Title>{movie.title}</Card.Title>

                      <Text textStyle='md' fontWeight='light'>
                        {movie.character}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                </Link>
              ))
            : "We don't have any movies added to this person. You can help by adding some!"}
        </Flex>
      </Box>
    );
};
