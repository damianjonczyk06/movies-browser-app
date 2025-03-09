import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowBack } from './ArrowBack';

export const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 1000);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Button
      position={'fixed'}
      bottom={'2rem'}
      left={'2rem'}
      transform={'rotate(90deg)'}
      borderRadius={'50%'}
      h={'4rem'}
      w={'4rem'}
      opacity={isVisible ? '100' : '0'}
      transition={'opacity 350ms'}
      zIndex={'10'}
      onClick={() =>
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <ArrowBack color='black' />
    </Button>
  );
};
