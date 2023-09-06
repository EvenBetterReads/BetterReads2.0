import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button, TextField } from '@mui/material';
import { loginUser, reload } from '../features/userSlice';
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
    <div style={styles.loginFormContainer} className='LoginSignup'>
      <Stack style={styles.loginFormContainer}>
        <h2 style={styles.h2}>Login</h2>
        <span style={styles.error}>{failedLogin ? 'incorrect username or password' : ''}</span>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField style={styles.textField} required size='small' id='username' label='Username' placeholder='Username' autoComplete='current-username' value={username} variant='filled' onChange={e => setUsername(e.target.value)} />
          <TextField style={styles.textField} required size='small' id='password' type='password' placeholder='Password' label='Password' autoComplete='current-password' variant='filled' value={password} onChange={e => setPassword(e.target.value)} />
          <Button style={styles.button} variant='outlined' size='small' id='login' className='auth-button' type='submit'>
            Log in
          </Button>
        </form>
        <p style={styles.noAccount}>
          Don't have an account? <Link to='/signup'>Sign Up!</Link>
        </p>
      </Stack>
    </div>
  );
}

const styles = {
  h2: {
    fontFamily: 'Helvetica, Tahoma, san-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '2em',
  },
  loginFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 'small',
    position: 'absolute',
    alignSelf: 'center',
    testWrap: 'wrap',
  },
  button: {
    margin: '1em',
    border: '1px solid #c72ffa',
    background: '#c72ffa',
    color: 'white',
  },
  noAccount: {
    fontFamily: 'Helvetica, Tahoma, san-serif',
  },
  textField: {
    border: '1px solid darkgray',
    borderRadius: '0.25em',
    margin: '.15em',
    boxShadow: '0',
  },
};

export default LoginForm;
