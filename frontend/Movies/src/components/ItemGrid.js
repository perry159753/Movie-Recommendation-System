import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const useStyles = makeStyles({
  container: {
    paddingTop: '4rem',
    paddingLeft: '4rem',
    color: theme => `${theme.text}`,
    '@media (max-width:720px)': {
      paddingLeft: '2rem',
      paddingTop: '1rem',
    },
  },
  root: {
    height: '58rem',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    overflowY: 'hidden',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    transition: 'all 0.5s',
    '@media (hover:hover)': {
      '&:hover li': {
        opacity: '0.5',
        transform: 'translateX(-2rem)',
      },
    },
  },
  list: {
    margin: '0 5px',
    transition: 'all 0.5s',
    '@media (hover:hover)': {
      '&&:hover': {
        opacity: '1',
        transform: 'scale(1.1) translateX(0)',
      },

      '&&:hover ~ *': {
        transform: 'translateX(2rem)',
      },
    },
  },
  poster: {
    borderRadius: '2rem',
  },
});

const ItemGrid = ({ items, type, name }) => {
  const { isLight, dark, light } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const classes = useStyles(theme);
  const title = type === 'movie' ? 'title' : 'name';
  const mobile = useMediaQuery('(max-width:720px)');
  const posterSize = mobile ? '185' : '342';
  const posterRadius = mobile ? '1rem' : '2rem';
  const rootSize = mobile ? '32rem' : '58rem';

  return (
    <div className={classes.container}>
      <Typography variant="h4">{name}</Typography>
      <ul style={{ height: rootSize }} className={classes.root}>
        {items.map(item => (
          <li key={item.id} className={classes.list}>
            <Link to={`/Moviezilla/${type}/${item.id}`} key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w${posterSize}${item.poster_path}`}
                alt={item[title]}
                style={{ borderRadius: posterRadius }}
                className={classes.poster}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemGrid;
