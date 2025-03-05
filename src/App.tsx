import { BrowserRouter, Route, Routes } from 'react-router';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './queryClient';

import { Toaster } from '@/components/ui/toaster';

import { MainView } from './views/Main/Main.view';
import { MovieDetailsView } from './views/MovieDetails/MovieDetails.view';

import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainView />} />
          <Route path='/movie/:id' element={<MovieDetailsView />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
