/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase'
import * as ROUTES from '../../constants/routes';
import { Redirect } from 'react-router-dom';

const SignOut = ({ classes }) => {
    const [redirect, setRedirect] = useState(false);
    const firebase = useFirebase();

    const _logout = () => {
      firebase.logout();
      setRedirect(true);
    }

    return(
      <>
        <h4 type="button" onClick={_logout} className={classes.toolbarItem}>
            sign out
        </h4>
        {redirect &&  <Redirect to={ROUTES.HOME} />}
      </>
    )
};

export default SignOut;