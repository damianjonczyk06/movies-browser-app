import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = new URL(import.meta.env.VITE_BASE_URL);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_KEY}`,
  },
};

export interface MoviesList {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
export interface Movie {
  id: number;
  original_title: string;
  title: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  backdrop_path: 'string';
  poster_path: 'string';
  release_date: 'string';
  runtime: number;
  status: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

interface Genres {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchParams {
  page?: number;
  sort_by?: string;
  with_genres: number[];
  'vote_average.gte'?: string;
}

export async function fetchMoviesListFn(searchParams: string, pageParam: number): Promise<MoviesList> {
  return (await axios.get(`${BASE_URL}/discover/movie?page=${pageParam}&${searchParams}`, options)).data;
}

export async function fetchMovieFn(id: string | undefined): Promise<Movie> {
  return (await axios.get(`${BASE_URL}/movie/${id}`, options)).data;
}

export async function fetchGenresListFn(): Promise<Genres> {
  return (await axios.get(`${BASE_URL}/genre/movie/list`, options)).data;
}

export async function searchMoviesListFn(query: string, pageParam: number): Promise<MoviesList> {
  return (await axios.get(`${BASE_URL}/search/movie?page=${pageParam}&query=${query}`, options)).data;
}

export const MoviesLibrary = {
  FetchMoviesListQuery: (searchParams: string) =>
    infiniteQueryOptions({
      queryKey: ['moviesLibrary', searchParams],
      queryFn: ({ pageParam = 1 }) => fetchMoviesListFn(searchParams, pageParam),
      getNextPageParam: movieList => movieList.page + 1,
      initialPageParam: 1,
    }),

  FetchMovieQuery: (id: string | undefined) => queryOptions({ queryKey: ['moviesLibrary', id], queryFn: () => fetchMovieFn(id) }),

  FetchGenresQuery: () => queryOptions({ queryKey: ['moviesLibrary', 'genres'], queryFn: () => fetchGenresListFn() }),

  SearchMoviesListQuery: (query: string) =>
    infiniteQueryOptions({
      queryKey: ['moviesLibrary', 'search', query],
      queryFn: ({ pageParam = 1 }) => searchMoviesListFn(query, pageParam),
      getNextPageParam: movieList => movieList.page + 1,
      initialPageParam: 1,
    }),
};
