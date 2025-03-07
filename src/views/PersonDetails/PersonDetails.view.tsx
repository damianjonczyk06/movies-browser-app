import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';

import { Credits } from './Credits';
import { PersonDetailsSkeleton } from './PersonDetailsSkeleton';

import api from '@/api';

export const PersonView = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery(api.MoviesLibrary.FetchPersonQuery(id));

  if (isPending) return <PersonDetailsSkeleton />;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (data)
    return (
      <Flex flexDirection={'column'}>
        <Flex position={'relative'} gap={'2rem'} p={'3rem 5rem'}>
          <Image
            borderRadius={'0.25rem'}
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt={`${data.name}`}
            height={'500px'}
            shadow={'xl'}
          />
          <Flex flexDirection={'column'} alignItems={'start'} justifyContent={'end'}>
            <Heading size={'4xl'} fontWeight={'bold'} mb={'.25rem'}>
              {data.name}
            </Heading>

            <Text textStyle='sm' textAlign={'start'}>
              {data.biography}
            </Text>
          </Flex>
        </Flex>

        <Credits />
      </Flex>
    );
};
