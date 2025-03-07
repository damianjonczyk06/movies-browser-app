import { Flex, Image, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) navigate(`/search/movie?query=${searchQuery}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <Flex
      position={'fixed'}
      top={'0'}
      left={'0'}
      zIndex={5}
      background={'gray.800'}
      w={'100%'}
      justifyContent={'space-between'}
      padding={'1rem'}
    >
      <Link to={'/'}>
        <Image src={`https://placehold.co/50x50`} alt='Movies Browser App Logo' />
      </Link>

      <Input w={'300px'} bgColor={'white'} placeholder='Search...' onChange={e => setSearchQuery(e.target.value)} />
    </Flex>
  );
};
