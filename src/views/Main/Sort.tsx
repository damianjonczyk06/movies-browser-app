import { Dispatch, SetStateAction } from 'react';
import { Box, createListCollection, Heading } from '@chakra-ui/react';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';

interface SortProps {
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
}

export const Sort = ({ sortValue, setSortValue }: SortProps) => {
  const sortOptions = createListCollection({
    items: [
      { label: 'Title ascending', value: 'title.asc' },
      { label: 'Title descending', value: 'title.desc' },

      { label: 'Vote average ascending', value: 'vote_average.asc' },
      { label: 'Vote average descending', value: 'vote_average.desc' },

      { label: 'Popularity ascending', value: 'popularity.asc' },
      { label: 'Popularity descending', value: 'popularity.desc' },
    ],
  });

  return (
    <Box>
      <Heading marginBottom={'0.5rem'}> Sort </Heading>
      <SelectRoot collection={sortOptions} value={[sortValue]} onValueChange={(e) => setSortValue(e.value[0])}>
        <SelectTrigger>
          <SelectValueText placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
};
