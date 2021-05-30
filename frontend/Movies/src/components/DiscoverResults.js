import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const useStyles = makeStyles({
  conatiner: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    paddingLeft: '0rem',
  },
  item: {
    display: 'flex',
    padding: '2rem 1rem',
    maxWidth: '80rem',
    color: theme => `${theme.secondary}`,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme => `${theme.card}`,
    },
  },
  poster: {
    marginRight: '1.5rem',
    borderRadius: '1rem',
  },
  result: {
    marginTop: '2rem',
  },
  overview: {
    maxWidth: '50rem',
    '@media (max-width:720px) and (min-width:500px)': {
      maxWidth: '35rem',
    },
    '@media (max-width:500px) and (min-width:360px)': {
      maxWidth: '25rem',
    },
    '@media (max-width:360px)': {
      maxWidth: '20rem',
    },
  },
});

const DiscoverResults = ({ results, type }) => {
  const { isLight, dark, light } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const classes = useStyles(theme);
  const title = type === 'movie' ? 'title' : 'name';
  const link = type === 'movie' ? 'movies' : 'tv';
  const mobile = useMediaQuery('(max-width:720px)');
  const posterSize = mobile ? '92' : '154';

  return (
    <>
      <Typography variant="h4" className={classes.result}>
        Results
      </Typography>
      <ul className={classes.conatiner}>
        {results.map(result => (
          <li key={result.id}>
            <Link
              to={`/Moviezilla/${link}/${result.id}`}
              key={result.id}
              className={classes.item}
            >
              <img
                src={`https://image.tmdb.org/t/p/w${posterSize}${result.poster_path}`}
                alt={result[title]}
                className={classes.poster}
              />
              <Typography className={classes.overview} variant="h6">
                {result.overview.length > 200
                  ? `${result.overview.slice(0, 200)}...`
                  : result.overview}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiscoverResults;
