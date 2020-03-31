import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

const SignUp = () => {
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    input: {
      backgroundColor: theme.background,
      color: theme.text,
      borderWidth: '0px 0px 2px 0px',
      borderColor: theme.text,
      fontFamily: 'Inconsolata',
      fontSize: '20px',
      display: 'block',
      margin: '20px'
      },
    parent: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '65%'
      },
    button: {
      width: '100px',
      height: '40px',
      backgroundColor: theme.background,
      color: theme.text,
      border: `2px solid ${theme.text}`,
      '&:disabled':{
          visibility: 'hidden'
      }
    },
    message: {
        maxHeight: '200px',
        maxWidth: '200px'
    }
  });
  const classes = useStyles();
  return(
    <>
      <div className={`${classes.parent} ${classes.signUpParent}`}>
          <h2>sign up</h2>
          <SignUpForm classes={classes} />
      </div>
    </>
  )
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const SignUpForm = ({classes}) => {
  const [content, setContent] = useState({...INITIAL_STATE});
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);

  const onSubmit = event => {
    const { username, email, passwordOne } = content;
    firebase
      .createUser({email: email, password: passwordOne}, {username: username, email: email})
      .catch(error => {
        setContent({ ...content, error });
      });
  };

  const onChange = event => {
    setContent({...content, [event.target.name]: event.target.value });
  };

  const isInvalid =
    content.passwordOne !== content.passwordTwo ||
    content.passwordOne === '' ||
    content.email === '' ||
    content.username === '';

  return (
    <>
      {isEmpty(auth) ? 
        <form onSubmit={onSubmit}>
          <input
            className={classes.input}
            name="username"
            value={content.username}
            onChange={onChange}
            type="text"
            placeholder="username"
          />
          <input
            className={classes.input}
            name="email"
            value={content.email}
            onChange={onChange}
            type="text"
            placeholder="email address"
          />
          <input
            className={classes.input}
            name="passwordOne"
            value={content.passwordOne}
            onChange={onChange}
            type="password"
            placeholder="password"
          />
          <input
            className={classes.input}
            name="passwordTwo"
            value={content.passwordTwo}
            onChange={onChange}
            type="password"
            placeholder="confirm password"
          />
          <button className={classes.button} disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {content.error && <p className={`${classes.message} ${classes.offset}`}>{content.error.message}</p>}
        </form>
        :
        <>
          {isLoaded(auth) && <Redirect to={ROUTES.HOME} />}
        </>
        }
    </>
  );
}

const SignUpLink = ({classes}) => {
  return (
    <p className={classes.message}>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
};

export default SignUp;
export { SignUpForm, SignUpLink };