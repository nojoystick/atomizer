import React, { useState } from 'react';
import { SignUpLink } from './SignUp';
import { PasswordResetLink } from './PasswordReset';
import * as ROUTES from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

const LogIn = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({theme: theme});

  return(
    <div className={classes.parent}>
      <h2>log in</h2>
      <LogInForm classes={classes}/>
      <PasswordResetLink classes={classes} />
      <SignUpLink classes={classes}/>
    </div>
  )
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const LogInForm = ({classes}) => {
  const [content, setContent] = useState({...INITIAL_STATE});
  const auth = useSelector(state => state.firebase.auth);
  const firebase = useFirebase();

  const onSubmit = event => {
    const { email, password } = content;
    firebase.login({email: email, password: password})
      .then(() => {        
        setContent({ ...INITIAL_STATE });
      })
      .catch(error => {
        setContent({...content, error });
      });
    event.preventDefault();
  };
  
  const onChange = event => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  const isInvalid = content.password === '' || content.email === '';

  return(
    <>
      {isEmpty(auth) ?
        <form onSubmit={onSubmit}>
          <input
            className={classes.input}
            name="email"
            value={content.email}
            onChange={onChange}
            type="text"
            placeholder="email"
          />
          <input
            className={classes.input}
            name="password"
            value={content.password}
            onChange={onChange}
            type="password"
            placeholder="password"
          />
          <button className={classes.button} disabled={isInvalid} type="submit">
            Sign In
          </button>
          {content.error && <p className={`${classes.message} ${classes.offset}`}>login error, check your username and password and try again</p>}
        </form>
        :
        <>
        {isLoaded(auth) && <Redirect to={ROUTES.HOME} />}
      </>
      }
    </>
  );
}

export default LogIn;