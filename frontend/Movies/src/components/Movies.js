import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import ItemGrid from './ItemGrid';
import { MoviesContext } from './MoviesContext';

const Movies = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <div>
      {movies.topRated && movies.popular && movies.nowPlaying && movies.upcoming ? (
        <>
          <ItemGrid items={movies.topRated} type="movies" name="Top Rated" />
          <ItemGrid items={movies.nowPlaying} type="movies" name="Now Playing" />
          <ItemGrid items={movies.popular} type="movies" name="Popular" />
          <ItemGrid items={movies.upcoming} type="movies" name="Upcoming" />
        </>
      ) : (
        <Typography variant="h3" color="secondary" align="center">
          Loading
        </Typography>
      )}
    </div>
  );
};

export default Movies;
