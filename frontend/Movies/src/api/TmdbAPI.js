import axios from 'axios';

const API_KEY = 'fa740a72f48db083462a1903e6b2773f';

export const baseUrl = 'https://api.themoviedb.org/3/';

const apiUrl = `api_key=${API_KEY}`;

export const caching = async url => {
  try {
    const cacheData = await caches.open('netflixCloneCache').then(async cache => {
      const match = await cache.match(url).then(async response => {
        if (response) {
          return response.json().then(res => res);
        }
        const result = await axios.get(url).then(data => data);
        cache.add(url);
        return result;
      });
      return match;
    });
    return cacheData;
  } catch (error) {
    const result = axios.get(url).then(data => data);
    return result;
  }
};

export const getTopRatedMovies = async () => {
  const result = caching(`${baseUrl}movie/top_rated?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getPopularMovies = async () => {
  const result = caching(`${baseUrl}movie/popular?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getUpcomingMovies = async () => {
  const result = caching(`${baseUrl}movie/upcoming?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getNowPlayingMovies = async () => {
  const result = caching(`${baseUrl}movie/now_playing?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getTopRatedTvShows = async () => {
  const result = caching(`${baseUrl}tv/top_rated?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getPopularTvShows = async () => {
  const result = caching(`${baseUrl}tv/popular?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getOnTheAirTvShows = async () => {
  const result = caching(`${baseUrl}tv/on_the_air?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getAiringTodayTvShows = async () => {
  const result = caching(`${baseUrl}tv/airing_today?${apiUrl}&language=en-US`).then(data => data);
  return result;
};

export const getMovieDetails = async id => {
  const result = caching(
    `${baseUrl}movie/${id}?${apiUrl}&append_to_response=videos,recommendations,credits&language=en-US`,
  ).then(data => data);
  return result;
};

export const getTvDetails = async id => {
  const result = caching(
    `${baseUrl}tv/${id}?${apiUrl}&append_to_response=videos,recommendations,credits&language=en-US`,
  ).then(data => data);
  return result;
};

export const getDiscoverResults = async (type, rating, genre, sortBy, year) => {
  if (type === 'movie') {
    const result = caching(
      `${baseUrl}discover/movie?${apiUrl}&language=en-US&sort_by=${sortBy}&primary_release_year=${year}&vote_average.gte=${rating}&with_genres=${genre}&include_adult=false&include_video=false&page=1`,
    ).then(data => data);
    return result;
  }
  const result = caching(
    `${baseUrl}discover/tv?${apiUrl}&language=en-USsort_by=${sortBy}&first_air_date_year=${year}&page=1&vote_average.gte=${rating}&with_genres=${genre}&include_null_first_air_dates=false`,
  ).then(data => data);
  return result;
};
