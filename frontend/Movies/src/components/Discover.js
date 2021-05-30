import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  useMediaQuery,
} from '@material-ui/core';
import { getDiscoverResults } from '../api/TmdbAPI';
import DiscoverResults from './DiscoverResults';
import { ThemeContext } from './ThemeContext';

const useStyles = makeStyles({
  paper: {
    margin: '0 auto',
    maxWidth: '128rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme => `${theme.background}`,
    boxShadow: 'none',
  },
  formContainer: {
    margin: '2rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width:500px)': {
      maxWidth: '35rem',
      flexWrap: 'wrap',
    },
  },
  form: {
    margin: '0 2rem',
    minWidth: '12rem',
    '@media (max-width:720px)': {
      minWidth: '0',
      margin: '0 1rem',
    },
  },
  title: {
    margin: '2rem 0',
  },
});

const itemHeight = 48;
const paddingTop = 8;
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: itemHeight * 4.5 + paddingTop,
      width: 250,
    },
  },
};

const Discover = () => {
  const { isLight, dark, light } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const classes = useStyles(theme);

  const mobile = useMediaQuery('(max-width:500px)');
  const style = mobile ? { margin: '1rem auto' } : {};

  const [filters, setFilters] = useState({
    type: 'movie',
    year: '2019',
    genre: '16',
    sortBy: 'popularity.desc',
    rating: '6',
  });
  const [results, setResults] = useState([]);

  const handleClick = (event, name) => {
    setFilters(prevState => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  useEffect(() => {
    getDiscoverResults(
      filters.type,
      filters.rating,
      filters.genre,
      filters.sortBy,
      filters.year,
    ).then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setResults(data.results);
    });
  }, [filters]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" className={classes.title}>
        Discover
      </Typography>
      <div className={classes.formContainer}>
        <FormControl className={classes.form}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filters.type}
            onClick={event => {
              handleClick(event, 'type');
            }}
            MenuProps={menuProps}
          >
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="tv">Tv</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.form}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filters.year}
            onClick={event => {
              handleClick(event, 'year');
            }}
            MenuProps={menuProps}
          >
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2014">2014</MenuItem>
            <MenuItem value="2013">2013</MenuItem>
            <MenuItem value="2012">2012</MenuItem>
            <MenuItem value="2011">2011</MenuItem>
            <MenuItem value="2010">2010</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.form}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={filters.rating}
            onClick={event => {
              handleClick(event, 'rating');
            }}
            MenuProps={menuProps}
          >
            <MenuItem value="9">&gt; 9</MenuItem>
            <MenuItem value="8">&gt; 8</MenuItem>
            <MenuItem value="7">&gt; 7</MenuItem>
            <MenuItem value="6">&gt; 6</MenuItem>
            <MenuItem value="5">&gt; 5</MenuItem>
            <MenuItem value="4">&gt; 4</MenuItem>
            <MenuItem value="3">&gt; 3</MenuItem>
            <MenuItem value="2">&gt; 2</MenuItem>
            <MenuItem value="1">&gt; 1</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.form}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            onClick={event => {
              handleClick(event, 'sortBy');
            }}
            MenuProps={menuProps}
          >
            <MenuItem value="primary_release_date">Release Date</MenuItem>
            <MenuItem value="vote_average.gte">Rating</MenuItem>
            <MenuItem value="popularity.desc">Popularity</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={style} className={classes.form}>
          <InputLabel>Genres</InputLabel>
          <Select
            value={filters.genre}
            onChange={event => {
              handleClick(event, 'genre');
            }}
            input={<Input />}
            MenuProps={menuProps}
          >
            <MenuItem value="16">Animation</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="80">Crime</MenuItem>
            <MenuItem value="14">Fantasy</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="9648">Mystery</MenuItem>
          </Select>
        </FormControl>
      </div>

      <DiscoverResults results={results} type={filters.type} />
    </Paper>
  );
};

export default Discover;
