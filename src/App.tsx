import { lazy, ReactNode, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { MainView } from './views/Main/Main.view';
import { Flex, ProgressCircle } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
import { useColorMode } from './components/ui/color-mode';
import { Menu } from './components/Menu';
import { ScrollTop } from './components/ScrollTop';

const MovieDetailsView = lazy(() => import('./views/MovieDetails/MovieDetails.view'));
const SearchView = lazy(() => import('./views/Search/Search.view'));
const PersonView = lazy(() => import('./views/PersonDetails/PersonDetails.view'));

import queryClient from './queryClient';

import './App.css';

const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Flex justifyContent={'center'} alignItems={'center'}>
        <ProgressCircle.Root position={'absolute'} top={'50%'} value={null} size='md'>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap='round' />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Flex>
    }
  >
    {children}
  </Suspense>
);

function App() {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('light');
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollTop />
      <BrowserRouter>
        <Flex flexDirection={'column'}>
          <Menu />

          <Routes>
            <Route index element={<MainView />} />
            <Route
              path='/movie/:id'
              element={
                <LazyRoute>
                  <MovieDetailsView />
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
