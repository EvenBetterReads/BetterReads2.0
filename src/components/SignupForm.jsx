import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, reload } from '../features/userSlice';
import '../styles/login-signup-form.scss';
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
    <div className='credentials'>
      <span className='error'>{failedSignup ? 'Error in signup form' : ''}</span>
      <form onSubmit={handleSubmit}>
        <TextField required size='small' id='username' label='Username' placeholder='Username' value={username} variant='filled' onChange={e => setUsername(e.target.value)} />
        <TextField required size='small' id='password' type='password' placeholder='Password' label='Password' variant='filled' value={password} onChange={e => setPassword(e.target.value)} />
        <button variant='outlined' size='small' id='signup' className='auth-button' type='submit'>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to='/'>Login!</Link>
      </p>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '30%',
    minWidth: '240px',
    maxWidth: '350px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '100%%',
    margin: '20px 10px 100px 10px',
  },
  h3: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '100%%',
    textWrap: 'true',
  },
  error: {
    color: 'red',
    fontSize: 'small',
    position: 'absolute',
    alignSelf: 'center',
    testWrap: 'wrap',
  },
};

export default SignupForm;
