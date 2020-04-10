import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import AccountStyles from './AccountStyles';
import { configActions } from '../../redux/actions';

const SignUp = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = AccountStyles({ theme: theme });
  return (
    <>
      <div className={`${classes.parent} ${classes.signUpParent}`}>
        <h2>sign up</h2>
        <SignUpForm classes={classes} />
      </div>
    </>
  );
};

const SignUpForm = ({ classes }) => {
  const login = useSelector(state => state.config.login);
  const formFields = useSelector(state => state.config.formFields);
  const INITIAL_STATE = {
    username: formFields.username,
    email: formFields.email,
    passwordOne: '',
    passwordTwo: '',
    error: null
  };
  const [content, setContent] = useState({ ...INITIAL_STATE });
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const onSubmit = event => {
    const { username, email, passwordOne } = content;
    dispatch(configActions.setFormFields(username, email));

    firebase
      .createUser({ email: email, password: passwordOne }, { username: username, email: email })
      .then(() => {
        dispatch(configActions.setLogin({ valid: true, message: false }));
      })
      .catch(error => {
        dispatch(configActions.setLogin({ valid: false, message: error.message }));
      });
    event.preventDefault();
  };

  const onChange = event => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  const isInvalid =
    content.passwordOne !== content.passwordTwo || content.passwordOne === '' || content.email === '' || content.username === '';

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className={classes.input}
          name='username'
          value={content.username}
          onChange={onChange}
          type='text'
          placeholder='username'
        />
        <input
          className={classes.input}
          name='email'
          value={content.email}
          onChange={onChange}
          type='text'
          placeholder='email address'
        />
        <input
          className={classes.input}
          name='passwordOne'
          value={content.passwordOne}
          onChange={onChange}
          type='password'
          placeholder='password'
        />
        <input
          className={classes.input}
          name='passwordTwo'
          value={content.passwordTwo}
          onChange={onChange}
          type='password'
          placeholder='confirm password'
        />
        <button className={classes.button} disabled={isInvalid} type='submit'>
          Sign Up
        </button>

        {login && login.message && <p className={`${classes.message} ${classes.offset}`}>{login.message}</p>}
      </form>
      {login && login.valid && <Redirect to={ROUTES.HOME} />}
    </>
  );
};

const SignUpLink = ({ classes }) => {
  return (
    <p className={classes.message}>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUp;
export { SignUpForm, SignUpLink };
