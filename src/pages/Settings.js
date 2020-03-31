import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Theme from '../stylesheets/Theme';
import { makeStyles } from '@material-ui/styles';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { defaultConfig } from '../config';

const Settings = () => {
  const { profile } = useSelector(state => state.firebase);
  const id = !profile.isEmpty ? profile.email : 'default';
  const firestore = useFirestore();
  useFirestoreConnect(() => [{ collection: 'config', doc: id }]);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const hotkeys = useSelector(state => state.config.hotkeys);
  const theme = useSelector(state => state.network.theme);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    sliderLabel: {
      display: 'block',
      fontFamily: 'Roboto Condensed',
      color: theme.text
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
      width: '100px',
      height: '40px',
      backgroundColor: theme.background,
      color: theme.text,
      borderWidth: '2px',
      borderColor: theme.text,
      '&:disabled': {
        visibility: 'hidden'
      }
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
        .update({ theme: defaultConfig.theme, hotkeys: defaultConfig.hotkeys });
    }
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        <span className={classes.toggle}>
          <p className={classes.sliderLabel}>theme</p>
          <label className='switch'>
            <input type='checkbox' onChange={toggleTheme} defaultChecked={theme === Theme.dark} />
            <span className='toggleSlider'></span>
          </label>
        </span>
        {screenInfo.width > 500 && (
          <span className={classes.toggle}>
            <p className={classes.sliderLabel}>hotkeys</p>
            <label className='switch'>
              <input type='checkbox' onChange={toggleHotkeys} defaultChecked={hotkeys} />
              <span className='toggleSlider'></span>
            </label>
          </span>
        )}
        <button className={classes.button} onClick={restoreDefaults}>
          restore defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
