import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../action/auth';
import { removeError, setError } from '../../action/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { mgsError } = useSelector((state) => state.ui);
  // console.log(mgsError);
  const [formValues, handleInputChange] = useForm({
    name: 'Shineily L',
    email: 'shineily@gmail.com',
    password: '1234567',
    password2: '1234567',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFromValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFromValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other'
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form className='animate__animated animate__fadeIn animate__faster' onSubmit={handleRegister}>
        {mgsError && <div className='auth__alert-error'>{mgsError}</div>}
        <input
          type='text'
          placeholder='Name'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Confirm password'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />
        <button type='submit' className='btn btn-primary btn-block mb-5'>
          Login
        </button>

        <Link to='/auth/login' className='link'>
          Already register?
        </Link>
      </form>
    </>
  );
};
