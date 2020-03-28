import React from 'react';
import { withFirebase } from '../../firebase';

const SignOut = ({ firebase, classes }) => {
    return(
    <h4 type="button" onClick={firebase.doSignOut} className={classes.toolbarItem}>
        sign out
    </h4>
    )
};

export default withFirebase(SignOut);