import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import LoginPage from './LoginPage';
import LibraryContainer from './LibraryContainer';

export default function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  return (
    <div style={styles.app}>
      <Typography style={styles.title} align='center'>
        Better Reads
      </Typography>
      <BrowserRouter>{loggedIn ? <LibraryContainer /> : <LoginPage />}</BrowserRouter>
    </div>
  );
}

const styles = {
  title: {
    padding: '1em',
    fontFamily: 'Bree Serif',
    fontSize: '2.5em',
  },
  app: {
    height: '100vh',
    width: '100vw',
  },
};
