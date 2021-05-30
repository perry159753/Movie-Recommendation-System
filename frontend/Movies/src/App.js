import React from 'react';
import { CssBaseline } from '@material-ui/core';
import MoviesContextProvider from './components/MoviesContext';
import Container from './components/Container';
import ThemeContextProvider from './components/ThemeContext';

function App() {
  return (
    <>
      <CssBaseline />
      <MoviesContextProvider>
        <ThemeContextProvider>
          <Container />
        </ThemeContextProvider>
      </MoviesContextProvider>
    </>
  );
}

export default App;
