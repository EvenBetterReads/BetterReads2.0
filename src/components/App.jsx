import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import LibraryContainer from './LibraryContainer';
import '../styles/app.scss';

export default function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  return (
    <div className='app'>
      <h1>Better Reads</h1>
      <BrowserRouter>{loggedIn ? <LibraryContainer /> : <LoginPage />}</BrowserRouter>
    </div>
  );
}
