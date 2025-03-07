import { lazy, ReactNode, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Flex } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
import { MainView } from './views/Main/Main.view';
import { Menu } from './components/Menu';
const MovieDetailsView = lazy(() => import('./views/MovieDetails/MovieDetails.view'));
const SearchView = lazy(() => import('./views/Search/Search.view'));
const PersonView = lazy(() => import('./views/PersonDetails/PersonDetails.view'));

import queryClient from './queryClient';
import './App.css';

const LazyRoute = ({ children }: { children: ReactNode }) => <Suspense fallback={'Loading...'}>{children}</Suspense>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Flex flexDirection={'column'}>
          <Menu />

          <Routes>
            <Route index element={<MainView />} />
            <Route
              path='/movie/:id'
              element={
                <LazyRoute>
                  <MovieDetailsView />{' '}
                </LazyRoute>
              }
            />
            <Route
              path='/person/:id'
              element={
                <LazyRoute>
                  <PersonView />
                </LazyRoute>
              }
            />
            <Route
              path='/search/movie'
              element={
                <LazyRoute>
                  <SearchView />
                </LazyRoute>
              }
            />
          </Routes>
          <Toaster />
        </Flex>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
