import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reload } from '../features/userSlice';
import { TextField } from '@mui/material';
import '../styles/login-signup-form.scss';
// import other components here

function LoginForm(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const failedLogin = useSelector(state => state.user.failedLogin);
  const dispatch = useDispatch();

  dispatch(reload);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      loginUser({
        username,
        password,
      }),
    );
  };

  return (
    <div className='credentials'>
      <span>{failedLogin ? 'incorrect username or password' : ''}</span>
      <form onSubmit={handleSubmit}>
        <TextField className='inputBox' required size='small' id='username' label='Username' placeholder='Username' autoComplete='current-username' value={username} variant='filled' onChange={e => setUsername(e.target.value)} />
        <TextField className='inputBox' required size='small' id='password' type='password' placeholder='Password' label='Password' autoComplete='current-password' variant='filled' value={password} onChange={e => setPassword(e.target.value)} />
        <button variant='outlined' size='small' id='login' className='auth-button' type='submit'>
          Log In
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign Up!</Link>
      </p>
    </div>
  );
}

export default LoginForm;
