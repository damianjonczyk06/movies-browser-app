import api from '@/api';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
export const Filters = ({ filterValue, setFilterValue }) => {
  const { data, isPending, error } = useQuery(api.MoviesLibrary.FetchGenresQuery());

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelectGenre = (genre: number) => {
    console.log(genre);
    console.log(filterValue);
    setFilterValue(prev => ({
      ...prev,
      with_genres: prev.with_genres.includes(genre) ? prev.with_genres.filter(v => v !== genre) : [...prev.with_genres, genre],
    }));
  };

  return (
    <Box>
      Genres:
      <Flex flexWrap={'wrap'} gap={'8px'} justifyContent={'center'} maxWidth={'280px'}>
        {data.genres.map(g => (
          <Button
            value={g.id}
            bgColor={filterValue.with_genres.includes(g.id) && 'cyan.700'}
            variant={filterValue.with_genres.includes(g.id) ? 'solid' : 'outline'}
            onClick={() => handleSelectGenre(g.id)}
          >
            {g.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};
