import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './queryClient';

import { MainView } from './views/Main/Main.view';
import { MovieDetailsView } from './views/MovieDetails/MovieDetails.view';
import { SearchView } from './views/Search/Search.view';

import { Flex } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';

import { Menu } from './components/Menu';

import './App.css';
import { PersonView } from './views/PersonDetails/PersonDetails.view';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Flex flexDirection={'column'}>
          <Menu />

          <Routes>
            <Route index element={<MainView />} />
            <Route path='/movie/:id' element={<MovieDetailsView />} />
            <Route path='/person/:id' element={<PersonView />} />
            <Route path='/search/movie' element={<SearchView />} />
          </Routes>
          <Toaster />
        </Flex>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
