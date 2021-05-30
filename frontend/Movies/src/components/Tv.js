import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import ItemGrid from './ItemGrid';
import { MoviesContext } from './MoviesContext';

const Tv = () => {
  const { tvShows } = useContext(MoviesContext);

  return (
    <div>
      {tvShows.topRated && tvShows.popular && tvShows.onTheAir && tvShows.airingToday ? (
        <>
          <ItemGrid items={tvShows.topRated} type="tv" name="Top Rated" />
          <ItemGrid items={tvShows.onTheAir} type="tv" name="On The Air" />
          <ItemGrid items={tvShows.popular} type="tv" name="Popular" />
          <ItemGrid items={tvShows.airingToday} type="tv" name="Airing Today" />
        </>
      ) : (
        <Typography variant="h3" color="secondary" align="center">
          Loading
        </Typography>
      )}
    </div>
  );
};

export default Tv;
