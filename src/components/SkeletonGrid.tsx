import { Box, Grid, Skeleton } from '@chakra-ui/react';
import { SkeletonText } from './ui/skeleton';

export const SkeletonGrid = () => (
  <Grid
    templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 250px))' }}
    justifyContent={'center'}
    gap='6'
    w={'100%'}
    p={'3rem'}
  >
    {[...Array(9)].map((_, index) => (
      <Box key={index} display='flex' flexDirection={'column'} justifyContent={'center'} gap={'6px'}>
        <Skeleton h='450px' w={'100%'} />
        <SkeletonText noOfLines={1} />
      </Box>
    ))}
  </Grid>
);
