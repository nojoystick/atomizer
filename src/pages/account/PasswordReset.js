import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase'

const PasswordResetPage = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({theme: theme});
  return(
    <div className={`${classes.parent} ${classes.passwordParent}`}>
      <h2>reset password</h2>
      <PasswordResetForm classes={classes}/>
    </div>
  )
};

const INITIAL_STATE = {
  email: '',
  message: null,
};

const PasswordResetForm = ({classes}) => {
  const [content, setContent] = useState({...INITIAL_STATE});

  const firebase = useFirebase();

  const onSubmit = event => {
    const { email } = content;
    firebase
      .resetPassword(email)
      .then(() => {
        setContent({ ...INITIAL_STATE, message: 'an email has been sent.' });
      })
      .catch(error => {
        setContent({ ...content, message: error.message });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  const isInvalid = content.email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        className={classes.input}
        name="email"
        value={content.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button className={classes.button} disabled={isInvalid} type="submit">
        Reset
      </button>
      {content.error && <p className={classes.message}>{content.message}</p>}
    </form>
  );
}

const PasswordResetLink = ({classes}) => {
  return (
    <p className={classes.message}>
      <Link to={ROUTES.PASSWORD_RESET}>forgot password?</Link>
    </p>
  )
};

export default PasswordResetPage;

export { PasswordResetForm, PasswordResetLink };