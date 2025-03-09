import { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';

import api from '@/api';
import type { SearchParams } from '@/api/movies';

interface FiltersProps {
  filterValue: SearchParams;
  setFilterValue: Dispatch<SetStateAction<SearchParams>>;
  defaultFilters: SearchParams;
}

export const Filters = ({ filterValue, setFilterValue, defaultFilters }: FiltersProps) => {
  const { data, isPending, error } = useQuery(api.MoviesLibrary.FetchGenresListQuery());

  const handleSelectGenre = (genre: number) => {
    setFilterValue((prev) => ({
      ...prev,
      with_genres: prev.with_genres.includes(genre) ? prev.with_genres.filter((v) => v !== genre) : [...prev.with_genres, genre],
    }));
  };

  const handleChangeScore = (value: number[]) => {
    setFilterValue((prev) => ({
      ...prev,
      'vote_average.gte': `${value[0]}`,
      'vote_average.lte': `${value[1]}`,
    }));
  };

  const handleChangeRuntime = (value: number[]) => {
    setFilterValue((prev) => ({
      ...prev,
      'with_runtime.gte': `${value[0]}`,
      'with_runtime.lte': `${value[1]}`,
    }));
  };

  if (isPending)
    return (
      <Flex flexDirection={'column'} gap={'1rem'}>
        <Skeleton h={'2rem'} w={'5rem'} />
        <Skeleton h={'3rem'} w={'100%'} />
        <Skeleton h={'3rem'} w={'100%'} />
      </Flex>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <Heading marginBottom={'0.5rem'}> Filters </Heading>
      <AccordionRoot spaceY='4' variant='plain' collapsible>
        <AccordionItem value={'genres'}>
          <Box position='relative'>
            <AccordionItemTrigger indicatorPlacement='start'>Genres</AccordionItemTrigger>
          </Box>
          <AccordionItemContent>
            <Flex flexWrap={'wrap'} gap={'8px'}>
              {data.genres.map((g) => (
                <Button
                  key={`${g.id}-${g.name}`}
                  value={g.id}
                  bgColor={filterValue.with_genres.includes(g.id) ? 'gray.800' : 'gray.100'}
                  variant={filterValue.with_genres.includes(g.id) ? 'solid' : 'outline'}
                  onClick={() => handleSelectGenre(g.id)}
                >
                  {g.name}
                </Button>
              ))}
            </Flex>
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value={'score'}>
          <Box position='relative'>
            <AccordionItemTrigger indicatorPlacement='start'>User Score</AccordionItemTrigger>
          </Box>
          <AccordionItemContent>
            <Slider
              minStepsBetweenThumbs={1}
              onValueChangeEnd={(e) => handleChangeScore(e.value)}
              defaultValue={[6, 10]}
              value={[parseInt(filterValue['vote_average.gte'] ?? ''), parseInt(filterValue['vote_average.lte'] ?? '')]}
              max={10}
              min={0}
              colorPalette={'gray'}
              marks={Array.from(Array(11)).map((_, i) => ({ value: i, label: `${i}` }))}
              padding={'0 1rem'}
            />
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value={'runtime'}>
          <Box position='relative'>
            <AccordionItemTrigger indicatorPlacement='start'>Runtime</AccordionItemTrigger>
          </Box>
          <AccordionItemContent>
            <Slider
              minStepsBetweenThumbs={50}
              onValueChangeEnd={(e) => handleChangeRuntime(e.value)}
              defaultValue={[0, 400]}
              value={[parseInt(filterValue['with_runtime.gte'] ?? ''), parseInt(filterValue['with_runtime.lte'] ?? '')]}
              max={400}
              min={0}
              step={50}
              colorPalette={'gray'}
              marks={Array.from(Array(5 * 2)).map((_, i) => ({ value: i * 100, label: `${i}` }))}
              padding={'0 1rem'}
            />
          </AccordionItemContent>
        </AccordionItem>

        <Button color={'black'} onClick={() => setFilterValue(defaultFilters)}>
          Clear Filters
        </Button>
      </AccordionRoot>
    </Box>
  );
};
