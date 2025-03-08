import { useNavigate } from 'react-router';
import { Button, Flex, Heading } from '@chakra-ui/react';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Flex position={'absolute'} flexDirection={'column'} alignItems={'center'} gap={'2rem'} top={'50%'} w={'100%'}>
      <Heading fontSize={'4xl'}>Something went wrong!</Heading>
      <Button onClick={() => navigate('/')} color={'black'}>
        Go to main page
      </Button>
    </Flex>
  );
};
