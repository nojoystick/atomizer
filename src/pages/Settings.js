import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Theme from '../stylesheets/Theme';
import { makeStyles } from '@material-ui/styles';
import { useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { defaultConfig } from '../config';
import { Redirect } from 'react-router-dom';
import * as Routes from '../constants/routes';
import { DeleteAccountModal } from '../components/modals/';

const Settings = () => {
  const { profile } = useSelector(state => state.firebase);
  const id = !profile.isEmpty ? profile.email : 'default';
  const firestore = useFirestore();
  const firebase = useFirebase();
  useFirestoreConnect(() => [{ collection: 'config', doc: id }]);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const login = useSelector(state => state.config.login);
  const hotkeys = useSelector(state => state.config.hotkeys);
  const theme = useSelector(state => state.network.theme);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    sliderLabel: {
      display: 'block',
      fontFamily: 'Roboto Condensed',
      color: theme && theme.text
    },
    vertical: {
      textAlign: 'center',
      width: '80%',
      marginBottom: '5px'
    },
    toggle: {
      margin: '20px 20px 20px 0px'
    },
    button: {
      margin: '20px 20px 20px 0px',
      display: 'block',
      width: '150px',
      height: '40px',
      backgroundColor: theme && theme.background,
      color: theme && theme.text,
      borderWidth: '2px',
      borderColor: theme && theme.text,
      fontSize: '16px',
      '&:disabled': {
        visibility: 'hidden'
      }
    },
    delete: {
      color: theme && theme.alertText,
      borderColor: theme && theme.alertText
    }
  });

  const classes = useStyles();

  useEffect(() => {
    setShow(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;
    dispatch(networkActions.setTheme(newTheme));
    if (id !== 'default') {
      firestore
        .collection('config')
        .doc(id)
        .update({ theme: newTheme.name });
    }
  };

  const toggleHotkeys = () => {
    const newHotkeys = !hotkeys;
    dispatch(configActions.setHotkeys(newHotkeys));
    if (id !== 'default') {
      firestore
        .collection('config')
        .doc(id)
        .update({ hotkeys: newHotkeys });
    }
  };

  const restoreDefaults = () => {
    dispatch(networkActions.setTheme(Theme[defaultConfig.theme]));
    dispatch(configActions.setHotkeys(defaultConfig.hotkeys));
    if (id !== 'default') {
      firestore
        .collection('config')
        .doc(id)
        .set(defaultConfig);
    }
  };

  const showAccountModal = () => {
    dispatch(configActions.setModal(DeleteAccountModal, deleteAccount, false));
    dispatch(networkActions.setModalVisible(true));
  };

  const deleteAccount = () => {
    firestore
      .collection('config')
      .doc(profile.email)
      .delete();
    var user_query = firestore.collection('users').where('email', '==', profile.email);
    user_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    firebase.auth().currentUser.delete();
    dispatch(configActions.setLogin({ valid: false }));
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        {id !== 'default' && <h3>hi, {profile.username}</h3>}
        <span className={classes.toggle}>
          <p className={classes.sliderLabel}>theme</p>
          <label className='switch'>
            <input type='checkbox' onChange={toggleTheme} defaultChecked={theme === Theme.dark} tabIndex='0' />
            <span className='toggleSlider'></span>
          </label>
        </span>
        {!screenInfo.isMobile && (
          <span className={classes.toggle}>
            <p className={classes.sliderLabel}>hotkeys</p>
            <label className='switch'>
              <input type='checkbox' onChange={toggleHotkeys} defaultChecked={hotkeys} tabIndex='0' />
              <span className='toggleSlider'></span>
            </label>
          </span>
        )}
        <button className={classes.button} onClick={restoreDefaults}>
          restore defaults
        </button>
        {login.valid && profile.email && (
          <button className={`${classes.button} ${classes.delete}`} onClick={showAccountModal}>
            delete account
          </button>
        )}
      </div>
      {!login.valid && profile.email && <Redirect to={Routes.HOME} />}
    </div>
  );
};

export default Settings;
