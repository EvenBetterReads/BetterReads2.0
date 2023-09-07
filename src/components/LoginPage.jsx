import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../styles/login.scss';
// import other components here

function LoginPage(props) {
  return (
    <div className='loginContainer'>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default LoginPage;
