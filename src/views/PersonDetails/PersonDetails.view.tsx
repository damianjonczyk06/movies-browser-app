import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Credits } from './Credits';
import { PersonDetailsSkeleton } from './PersonDetailsSkeleton';
import { ArrowBack } from '@/components/ArrowBack';
import { ErrorPage } from '@/components/ErrorPage';

import api from '@/api';

const PersonView = () => {
  const { id } = useParams();
  if (!id) throw new Error('ID is empty');

  const { data, isPending, isError } = useQuery(api.MoviesLibrary.FetchPersonQuery(id));
  const navigate = useNavigate();

  if (isPending) return <PersonDetailsSkeleton />;
  if (isError) return <ErrorPage />;

  if (data)
    return (
      <Flex flexDirection={'column'}>
        <Flex
          position={'relative'}
          flexDirection={{ base: 'column', md: 'row' }}
          gap={'2rem'}
          p={{ base: '3rem 1rem', md: '3rem 5rem' }}
        >
          <Button
            fontSize={'md'}
            fontWeight={'light'}
            background={{ base: 'transparent', _hover: 'transparent' }}
            color={{ base: 'white', _hover: 'white' }}
            textDecoration={{ base: 'none', _hover: 'underline 2px solid white' }}
            position={'absolute'}
            top={'0.25rem'}
            left={{ base: '-0.5rem', md: { _hover: '3rem', base: '3.5rem' } }}
            transition={'left 200ms ease-in-out'}
            onClick={() => navigate(-1)}
          >
            <ArrowBack color='black' />
          </Button>

          <Image
            borderRadius={'0.25rem'}
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt={`${data.name}`}
            height={'500px'}
            maxWidth={'330px'}
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

export default PersonView;
