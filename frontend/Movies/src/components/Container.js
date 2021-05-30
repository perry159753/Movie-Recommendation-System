import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import NavBar from './NavBar';
import Home from './Home';
import Movies from './Movies';
import Tv from './Tv';
import Discover from './Discover';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';
import ScrollToTop from './ScrollToTop';
import Analytics from './Analytics';
import { ThemeContext } from './ThemeContext';

let themeDark = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: '"Oswald","Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 10,
  },
});
themeDark = responsiveFontSizes(themeDark);

let themeLight = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontFamily: '"Oswald","Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 10,
  },
});
themeLight = responsiveFontSizes(themeLight);

const useStyles = makeStyles({
  container: {
    backgroundColor: theme => `${theme.background}`,
  },
});

const Container = () => {
  const { isLight, dark, light } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const themeProvider = isLight ? themeLight : themeDark;
  const classes = useStyles(theme);
  return (
    <ThemeProvider theme={themeProvider}>
      <div className={classes.container}>
        <Router>
          <ScrollToTop />
          <NavBar />
          <Switch>
            <Route path="/Moviezilla/" exact component={Home} />
            <Route path="/Moviezilla/movies" exact component={Movies} />
            <Route path="/Moviezilla/tv" exact component={Tv} />
            <Route path="/Moviezilla/discover" component={Discover} />
            <Route path="/Moviezilla/analytics" component={Analytics} />
            <Route path="/Moviezilla/movies/:id" component={MovieDetails} />
            <Route path="/Moviezilla/tv/:id" component={TvDetails} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default Container;
