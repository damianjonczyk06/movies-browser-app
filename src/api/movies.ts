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

export interface Credits {
  id: number;
  cast: Cast[];
}

interface Cast {
  id: number;
  name: string;
  original_name: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: 0;
}

export interface SearchParams {
  page?: number;
  sort_by?: string;
  with_genres: number[];
  'vote_average.gte'?: string;
}

interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
}

interface PersonCredits {
  id: number;
  cast: PersonCast[];
}

interface PersonCast {
  id: number;
  original_title: string;
  poster_path: string;
  title: string;
  character: string;
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

export async function fetchCreditsListFn(id: string | undefined): Promise<Credits> {
  return (await axios.get(`${BASE_URL}/movie/${id}/credits`, options)).data;
}

export async function searchMoviesListFn(query: string, pageParam: number): Promise<MoviesList> {
  return (await axios.get(`${BASE_URL}/search/movie?page=${pageParam}&query=${query}`, options)).data;
}

export async function fetchPersonFn(id: string | undefined): Promise<Person> {
  return (await axios.get(`${BASE_URL}/person/${id}`, options)).data;
}

export async function fetchPersonCreditsFn(id: string | undefined): Promise<PersonCredits> {
  return (await axios.get(`${BASE_URL}/person/${id}/movie_credits`, options)).data;
}

export const MoviesLibrary = {
  FetchMoviesListQuery: (searchParams: string) =>
    infiniteQueryOptions({
      queryKey: ['moviesLibrary', searchParams],
      queryFn: ({ pageParam = 1 }) => fetchMoviesListFn(searchParams, pageParam),
      getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
      initialPageParam: 1,
    }),

  FetchMovieQuery: (id: string | undefined) => queryOptions({ queryKey: ['moviesLibrary', id], queryFn: () => fetchMovieFn(id) }),

  FetchGenresListQuery: () => queryOptions({ queryKey: ['moviesLibrary', 'genres'], queryFn: () => fetchGenresListFn() }),

  FetchCreditsListQuery: (id: string | undefined) =>
    queryOptions({ queryKey: ['moviesLibrary', 'credits', id], queryFn: () => fetchCreditsListFn(id) }),

  FetchPersonQuery: (id: string | undefined) =>
    queryOptions({ queryKey: ['moviesLibrary', 'person', id], queryFn: () => fetchPersonFn(id) }),

  FetchPersonCreditsQuery: (id: string | undefined) =>
    queryOptions({ queryKey: ['moviesLibrary', 'person', 'credits', id], queryFn: () => fetchPersonCreditsFn(id) }),

  SearchMoviesListQuery: (query: string) =>
    infiniteQueryOptions({
      queryKey: ['moviesLibrary', 'search', query],
      queryFn: ({ pageParam = 1 }) => searchMoviesListFn(query, pageParam),
      getNextPageParam: (movieList) => movieList.page + 1,
      initialPageParam: 1,
    }),
};
