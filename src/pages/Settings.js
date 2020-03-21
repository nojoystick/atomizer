import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Theme from '../stylesheets/Theme';
import { makeStyles } from '@material-ui/styles';

const Settings = () => {
  const { hotkeys } = useSelector(state => state.config);
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
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
    }
  });

  const classes = useStyles();

  useEffect(() => {
    setShow(true);
  }, []);

  const toggleTheme = () => {
    dispatch(networkActions.setTheme(theme === Theme.dark ? Theme.light : Theme.dark));
  };

  const toggleHotkeys = () => {
    dispatch(configActions.setHotkeys(!hotkeys));
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        <div className={classes.sliderLabel}>theme</div>
        <label className='switch'>
          <input type='checkbox' onChange={toggleTheme} defaultChecked={theme === Theme.dark} />
          <span className='toggleSlider'></span>
        </label>
        {screenInfo.width > 500 && (
          <>
            <div className={classes.sliderLabel}>hotkeys</div>
            <label className='switch'>
              <input type='checkbox' onChange={toggleHotkeys} defaultChecked={hotkeys} />
              <span className='toggleSlider'></span>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
