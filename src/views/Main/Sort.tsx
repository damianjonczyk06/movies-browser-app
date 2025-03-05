import { Box, createListCollection } from '@chakra-ui/react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';

export const Sort = ({ sortValue, setSortValue }) => {
  const sortOptions = createListCollection({
    items: [
      { label: 'title.asc', value: 'title.asc' },
      { label: 'title.desc', value: 'title.desc' },

      { label: 'vote_average.asc', value: 'vote_average.asc' },
      { label: 'vote_average.desc', value: 'vote_average.desc' },

      { label: 'popularity.asc', value: 'popularity.asc' },
      { label: 'popularity.desc', value: 'popularity.desc' },
    ],
  });

  return (
    <Box>
      <SelectRoot collection={sortOptions} value={sortValue} onValueChange={e => setSortValue(e.value)} width={'300px'}>
        <SelectLabel>Sort</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.items.map(option => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
};
