import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Box, Card, Flex, Heading, Image, Text } from '@chakra-ui/react';

import api from '@/api';

export const Credits = () => {
  const { id } = useParams();
  if (!id) throw new Error('ID is empty');

  const { data, isPending, error } = useQuery(api.MoviesLibrary.FetchCreditsListQuery(id));

  if (isPending) return <>Pending</>;
  if (error) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Box p={'2.5rem'}>
        <Heading>Cast:</Heading>

        <Flex p={'1rem 1px'} width={'100%'} gap={'1rem'} overflowX={'auto'}>
          {data?.cast.length
            ? data?.cast.map((person) => (
                <Link to={`/person/${person.id}`} key={person.id}>
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
                        person.profile_path
                          ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`
                          : person.gender == 1
                            ? '/images/person/female_avatar_placeholder.jpg'
                            : '/images/person/male_avatar_placeholder.jpg'
                      }
                      alt={`${person.name}`}
                      minW={'100%'}
                      maxH={'240px'}
                      h={'100%'}
                      borderRadius={'0.25rem 0.25rem 0 0'}
                    />

                    <Card.Body p={'1.5rem 0.5rem 0 0.5rem'} alignItems={'start'} position={'relative'}>
                      <Card.Title>{person.name}</Card.Title>

                      <Text textStyle='md' fontWeight='light'>
                        {person.character}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                </Link>
              ))
            : "We don't have any cast added to this movie. You can help by adding some!"}
        </Flex>
      </Box>
    );
};
