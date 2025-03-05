import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = new URL(import.meta.env.VITE_BASE_URL);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_KEY}`,
  },
};

export interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Genre[]
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

export interface MoviesList {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMoviesListFn(searchParams) {
  return (await axios.get(`${BASE_URL}/discover/movie?${searchParams}`, options)).data;
}

export async function fetchMovieFn(id: string | undefined) {
  return (await axios.get(`${BASE_URL}/movie/${id}`, options)).data;
}

export async function fetchGenresListFn() {
  return (await axios.get(`${BASE_URL}/genre/movie/list`, options)).data;
}

export const MoviesLibrary = {
  FetchMoviesListQuery: searchParams =>
    queryOptions<MoviesList, Error>({ queryKey: ['moviesLibrary'], queryFn: () => fetchMoviesListFn(searchParams) }),

  FetchMovieQuery: (id: string | undefined) =>
    queryOptions<Movie, Error>({ queryKey: ['moviesLibrary', id], queryFn: () => fetchMovieFn(id) }),

  FetchGenresQuery: () =>
    queryOptions<Genres, Error>({ queryKey: ['moviesLibrary', 'genres'], queryFn: () => fetchGenresListFn() }),
};
