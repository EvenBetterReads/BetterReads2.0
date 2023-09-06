import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button, TextField } from '@mui/material';
import { signupUser, reload } from '../features/userSlice';
// import other components here

function SignupForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const failedSignup = useSelector(state => state.user.failedSignup);
  const dispatch = useDispatch();

  dispatch(reload);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      signupUser({
        username,
        password,
      }),
    );
  };

  return (
    <div className='SignupContainer' style={styles.signupContainer}>
      <Stack style={styles.signupContainer}>
        <h2 style={styles.h2}>Sign Up</h2>
        <span style={styles.error}>
          {failedSignup ? 'Error in signup form' : ''}
        </span>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField style={styles.textField}
            required
            size='small'
            id='username'
            label='Username'
            placeholder='Username'
            value={username}
            variant='filled'
            onChange={e => setUsername(e.target.value)}
          />
          <TextField style={styles.textField}
            required
            size='small'
            id='password'
            type='password'
            placeholder='Password'
            label='Password'
            variant='filled'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button styles={styles.button}
            variant='outlined'
            size='small'
            id='signup'
            className='auth-button'
            type='submit'>
            Sign Up
          </Button>
        </form>
        <p style={styles.noAccount}>
          Already have an account? <Link to='/'>Login!</Link>
        </p>
      </Stack>
    </div>
  );
}

const styles = {
  h2: {
    fontFamily: 'Helvectica, Tahoma, san-serif',
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '2em',
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

export default SignupForm;
