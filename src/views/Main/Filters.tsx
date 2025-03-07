import api from '@/api';
import { SearchParams } from '@/api/movies';
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface FiltersProps {
  filterValue: SearchParams;
  setFilterValue: Dispatch<SetStateAction<SearchParams>>;
}

export const Filters = ({ filterValue, setFilterValue }: FiltersProps) => {
  const { data, isPending, error } = useQuery(api.MoviesLibrary.FetchGenresListQuery());

  const handleSelectGenre = (genre: number) => {
    setFilterValue((prev) => ({
      ...prev,
      with_genres: prev.with_genres.includes(genre) ? prev.with_genres.filter((v) => v !== genre) : [...prev.with_genres, genre],
    }));
  };

  const handleChangeScore = (value: number) => {
    setFilterValue((prev) => ({
      ...prev,
      'vote_average.gte': `${value}`,
    }));
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <Heading marginBottom={'0.5rem'}> Filters </Heading>
      <AccordionRoot spaceY='4' variant='plain' collapsible defaultValue={['b']}>
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
              onValueChangeEnd={(e) => handleChangeScore(e.value[0])}
              defaultValue={[5]}
              max={10}
              min={1}
              colorPalette={'gray'}
              marks={Array.from(Array(10)).map((_, i) => ({ value: i + 1, label: `${i + 1}` }))}
              padding={'0 1rem'}
            />
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Box>
  );
};
