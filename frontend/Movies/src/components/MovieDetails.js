import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemGrid from './ItemGrid';
import { getMovieDetails } from '../api/TmdbAPI';
import { ThemeContext } from './ThemeContext';

const useStyles = makeStyles({
  paper: {
    maxWidth: '128rem',
    margin: '0 auto',
    backgroundColor: theme => `${theme.background}`,
    boxShadow: 'none',
  },
  imgContainer: {
    height: '60rem',
    position: 'relative',
    padding: '4rem 6rem',
    display: 'flex',
    '&::before': {
      position: 'absolute',
      content: "' '",
      top: '0',
      bottom: '0',
      right: '0',
      left: '0',
      backgroundImage:
        'linear-gradient(to right, rgba(0,0,0,0.8),  rgba(0,0,0,0.8) 20%,rgba(0,0,0,0))',
    },
    '@media (max-width:720px) and (min-width:600px)': {
      height: '43rem',
      padding: '4rem 2rem',
    },
    '@media (max-width:600px) ': {
      height: '43rem',
      padding: '2rem 2rem',
    },
  },
  details: {
    color: 'white',
    zIndex: '1',
    maxWidth: '80rem',
  },
  title: {
    marginBottom: '1.5rem',
    '@media (max-width:720px) and (min-width: 600px)': {
      fontSize: '3.5rem',
    },
    '@media (max-width:500px)': {
      fontSize: '3rem',
      marginBottom: '0.6rem',
    },
  },
  info: {
    marginBottom: '3rem',
    color: '#ccc',
    '@media (max-width:720px) and (min-width: 600px)': {
      fontSize: '1.8rem',
    },
    '@media (max-width:500px)': {
      marginBottom: '1rem',
    },
  },
  overview: {
    fontFamily: 'Helvetica,sans-serif',
    marginBottom: '3rem',
    '@media (max-width:720px) and (min-width: 600px)': {
      fontSize: '1.8rem',
    },
    '@media (max-width:720px)': {
      marginBottom: '1rem',
    },
    '@media (max-width:400px)': {
      fontSize: '1.5rem',
    },
  },
  container: {
    display: 'flex',
  },
  subtitle: {
    color: '#ccc',
    marginBottom: '0.5rem',
    '@media (max-width:720px) and (min-width: 600px)': {
      fontSize: '1.5rem',
    },
  },
  subcontent: {
    marginLeft: '0.5rem',
    '@media (max-width:720px) and (min-width: 600px)': {
      fontSize: '1.5rem',
    },
  },
  trailer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem',
  },
  recommendations: {
    '&& > div': {
      paddingLeft: '0',
    },
  },
});

const MovieDetails = () => {
  const { isLight, dark, light } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const classes = useStyles(theme);

  const mobile = useMediaQuery('(max-width:720px)');
  const smallMobile = useMediaQuery('(max-width:500px)');
  const posterSize = mobile ? '780' : '1280';
  let trailerSize;
  if (smallMobile) {
    trailerSize = '220px';
  } else if (mobile) {
    trailerSize = '380px';
  } else {
    trailerSize = '600px';
  }

  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [otherData, setOtherData] = useState({
    genre: [],
    credits: [],
    rating: '',
    runtime: '',
    trailer: '',
  });

  useEffect(() => {
    setOtherData({
      genre: [],
      credits: [],
      rating: '',
      runtime: '',
      trailer: '',
    });
    getMovieDetails(id).then(response => {
      let data;
      if (response.data) {
        data = response.data;
      } else {
        data = response;
      }
      setMovie(data);
      data.genres.forEach(item => {
        setOtherData(prevState => ({
          ...prevState,
          genre: [...prevState.genre, `${item.name}`],
        }));
      });

      data.credits.cast.slice(0, 3).forEach(item => {
        setOtherData(prevState => ({
          ...prevState,
          credits: [...prevState.credits, `${item.name}`],
        }));
      });
      if (data.vote_average !== 0) {
        setOtherData(prevState => ({
          ...prevState,
          rating: `| ${data.vote_average}`,
        }));
      }

      if (data.runtime !== null) {
        setOtherData(prevState => ({
          ...prevState,
          runtime: `| ${data.runtime} mins`,
        }));
      }

      if (data.videos.results.length > 0) {
        setOtherData(prevState => {
          const trailers = data.videos.results.filter(result => result.type === 'Trailer');
          const trailer = trailers[0] ? `${trailers[0].key}` : `${data.videos.results[0].key}`;
          return {
            ...prevState,
            trailer,
          };
        });
      }
    });
  }, [id]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.trailer}>
        <iframe
          src={`https://www.youtube.com/embed/${otherData.trailer}`}
          title="Trailer"
          width="1280"
          height={trailerSize}
          frameBorder="0"
        />
      </div>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w${posterSize}${movie.backdrop_path}`,
        }}
        className={classes.imgContainer}
      >
        {movie.title ? (
          <div className={classes.details}>
            <Typography variant="h2" className={classes.title}>
              {`${movie.title}`}
            </Typography>
            <Typography variant="h5" className={classes.info}>
              {`${movie.release_date.slice(0, 4)} ${otherData.rating} ${otherData.runtime}`}
            </Typography>
            <Typography variant="h5" className={classes.overview}>
              {`${movie.overview}`}
            </Typography>
            <div className={classes.container}>
              <Typography variant="h6" className={classes.subtitle}>
                Starring:
              </Typography>
              <Typography variant="h6" gutterBottom className={classes.subcontent}>
                {` ${otherData.credits.join(',')}`}
              </Typography>
            </div>
            <div className={classes.container}>
              <Typography variant="h6" className={classes.subtitle}>
                Genres:
              </Typography>
              <Typography variant="h6" gutterBottom className={classes.subcontent}>
                {` ${otherData.genre.join(',')}`}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>
      <div className={classes.recommendations}>
        {movie.recommendations ? (
          <ItemGrid items={movie.recommendations.results} type="movies" name="Recommendations" />
        ) : null}
      </div>
    </Paper>
  );
};

export default MovieDetails;
