import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import ItemGrid from './ItemGrid';
import { MoviesContext } from './MoviesContext';

const Home = () => {
  const { movies, tvShows } = useContext(MoviesContext);
  return (
    <div>
      {movies.topRated &&
      movies.popular &&
      movies.nowPlaying &&
      movies.upcoming &&
      tvShows.topRated &&
      tvShows.popular &&
      tvShows.onTheAir &&
      tvShows.airingToday ? (
        <>
          <ItemGrid items={movies.topRated} type="movies" name="Top Rated Movies" />
          <ItemGrid items={tvShows.topRated} type="tv" name="Top Rated TV Shows" />
          <ItemGrid items={movies.nowPlaying} type="movies" name="Now Playing Movies" />
          <ItemGrid items={tvShows.onTheAir} type="tv" name="On The Air TV Shows" />
          <ItemGrid items={movies.popular} type="movies" name="Popular Movies" />
          <ItemGrid items={tvShows.popular} type="tv" name="Popular TV Shows" />
          <ItemGrid items={movies.upcoming} type="movies" name="Upcoming Movies" />
          <ItemGrid items={tvShows.airingToday} type="tv" name="Airing Today TV Shows" />
        </>
      ) : (
        <Typography variant="h3" color="secondary" align="center">
          Loading
        </Typography>
      )}
    </div>
  );
};

export default Home;
