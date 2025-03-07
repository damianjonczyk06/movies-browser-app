import { SkeletonText } from '@/components/ui/skeleton';
import { Box, Flex, Skeleton } from '@chakra-ui/react';

export const PersonDetailsSkeleton = () => {
  return (
    <Flex flexDirection={'column'}>
      <Flex position={'relative'} gap={'2rem'} p={'3rem 5rem'}>
        <Skeleton h={'500px'} w={'333px'} />

        <Flex flexDirection={'column'} alignItems={'start'} justifyContent={'end'} color={'fg.inverted'}>
          <Skeleton h={'2.5rem'} w={'300px'} />

          <Flex gap={'2px'} mb={'1rem'} mt={'1rem'}>
            <SkeletonText noOfLines={1} w={'200px'} />
            <SkeletonText noOfLines={1} w={'50px'} />
          </Flex>

          <SkeletonText noOfLines={3} w={'300px'} />
        </Flex>
      </Flex>

      <Box p={'2.5rem'}>
        <SkeletonText noOfLines={1} w={'100px'} />

        <Flex gap={'1rem'} p={'1rem 1px'}>
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
          <Skeleton h={'352px'} w={'200px'} />
        </Flex>
      </Box>
    </Flex>
  );
};
