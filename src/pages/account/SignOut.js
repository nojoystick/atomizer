/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { configActions } from '../../redux/actions';

const SignOut = ({ classes }) => {
  const login = useSelector(state => state.config.login);
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const _logout = () => {
    firebase.logout();
    dispatch(configActions.setLogin({ valid: false }));
  };

  return (
    <>
      <h4 type='button' onClick={_logout} className={classes.toolbarItem}>
        sign out
      </h4>
      {!login.valid && <Redirect to={ROUTES.HOME} />}
    </>
  );
};

export default SignOut;
