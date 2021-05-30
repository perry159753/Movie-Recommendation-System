import React, { createContext, useState, useEffect } from 'react';
import {
  getTopRatedMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getOnTheAirTvShows,
  getTopRatedTvShows,
  getPopularTvShows,
  getAiringTodayTvShows,
} from '../api/TmdbAPI';

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setmovies] = useState([]);
  const [tvShows, settvShows] = useState([]);

  useEffect(() => {
    getTopRatedMovies().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setmovies(prevState => ({
        ...prevState,
        topRated: data.results,
      }));
    });

    getPopularMovies().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setmovies(prevState => ({
        ...prevState,
        popular: data.results,
      }));
    });

    getUpcomingMovies().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setmovies(prevState => ({
        ...prevState,
        upcoming: data.results,
      }));
    });

    getNowPlayingMovies().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setmovies(prevState => ({
        ...prevState,
        nowPlaying: data.results,
      }));
    });

    getTopRatedTvShows().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      settvShows(prevState => ({
        ...prevState,
        topRated: data.results,
      }));
    });

    getPopularTvShows().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      settvShows(prevState => ({
        ...prevState,
        popular: data.results,
      }));
    });

    getOnTheAirTvShows().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      settvShows(prevState => ({
        ...prevState,
        onTheAir: data.results,
      }));
    });

    getAiringTodayTvShows().then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      settvShows(prevState => ({
        ...prevState,
        airingToday: data.results,
      }));
    });
  }, []);

  return <MoviesContext.Provider value={{ movies, tvShows }}>{children}</MoviesContext.Provider>;
};

export default MoviesContextProvider;
