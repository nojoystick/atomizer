import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import * as Components from './pages';
import Theme from './stylesheets/Theme';
import Audio from './audio/Audio';
import Icon from './components/Icon';
import IconSet from './constants/icon-set';
import Grayscale from './constants/grayscale';
import * as Routes from './constants/routes';
import { defaultConfig } from './config';
import { useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import useLoadFirestoreValues from './utils/useLoadFirestoreValues';
import useStyles from './AppStyles.js';
import './stylesheets/App.scss';

const App = () => {
  const [_theme, setTheme] = useState(null);
  const [_hotkeys, setHotkeys] = useState(null);
  const [show, setShow] = useState(false);
  const [fill, setFill] = useState(0);
  const [fillTimer, setFillTimer] = useState(null);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile); // todo: fix double render
  const id = !profile.isEmpty ? profile.email : 'default';

  useFirestoreConnect(() => [{ collection: 'config', doc: id }]);
  const config = useSelector(state => state.firestore.ordered.config);
  useLoadFirestoreValues(_theme, _hotkeys);

  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({ theme: theme });
  const targetElement = document.querySelector('#root');
  targetElement.style.backgroundColor = theme && theme.background;
  disableBodyScroll(targetElement);

  useEffect(() => {
    if (config && _theme !== config[0].theme) {
      setTheme(Theme[config[0].theme]);
    }
    if (config && _hotkeys !== config[0].hotkeys) {
      setHotkeys(config[0].hotkeys);
    }
  }, [_hotkeys, _theme, config]);

  useEffect(() => {
    if (config && config[0]) {
      setTimeout(() => setShow(true), 3000);
    } else if (config && config.length === 0) {
      setTheme(Theme[defaultConfig.theme]);
    }
  }, [config]);

  useEffect(() => {
    let t;
    let index = fill;
    let isInc = true; // increment or decrement
    const updateFill = () => {
      if (index < Grayscale.length && index >= 0) {
        index = isInc ? index + 2 : index - 2;
        setFill(index);
      }
      if (index === 0) {
        isInc = true;
      }
      if (index === Grayscale.length - 1) {
        isInc = false;
      }
    };
    if (!show) {
      t = setInterval(updateFill, 50);
      setFillTimer(t);
    } else {
      clearInterval(fillTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    setShow(false);
  }, [auth, profile]);

  useEffect(() => {
    const initializeMasterGain = () => {
      Audio.masterGainNode.gain.setValueAtTime(0.0, Audio.context.currentTime);
      Audio.preampGainNode.connect(Audio.hpFilter);
      Audio.preampGainNode.connect(Audio.lpFilter);

      Audio.hpFilter.type = 'highpass';
      Audio.hpFilter.frequency.setValueAtTime(0, Audio.context.currentTime);
      Audio.hpFilter.Q.setValueAtTime(0, Audio.context.currentTime);
      Audio.hpFilter.connect(Audio.masterGainNode);

      Audio.lpFilter.type = 'lowpass';
      Audio.lpFilter.frequency.setValueAtTime(0, Audio.context.currentTime);
      Audio.lpFilter.Q.setValueAtTime(0, Audio.context.currentTime);
      Audio.lpFilter.connect(Audio.masterGainNode);

      Audio.masterGainNode.connect(Audio.context.destination);
    };
    initializeMasterGain();
  }, []);

  const Header = () => {
    return (
      <>
        <header className={classes.titleHeader}>
          <div className={classes.floatRight}>
            <NavLink to={Routes.ABOUT} className={classes.toolbarItem}>
              about
            </NavLink>
            <NavLink to={Routes.SETTINGS} className={classes.toolbarItem}>
              settings
            </NavLink>
            {isEmpty(auth) && (
              <NavLink to={Routes.LOG_IN} className={classes.toolbarItem}>
                log in
              </NavLink>
            )}
            {!isEmpty(auth) && <Components.SignOut classes={classes} />}
            {!isEmpty(auth) && profile.admin && (
              <NavLink to={Routes.ADMIN} className={classes.toolbarItem}>
                admin
              </NavLink>
            )}
          </div>
          <h1>
            <NavLink exact to='/'>
              atomizer
            </NavLink>
          </h1>
        </header>
        <div id='body' className={classes.body}>
          <Route path={Routes.HOME} exact component={Components.Home} />
          <Route path={Routes.ABOUT} component={Components.About} />
          <Route path={Routes.SETTINGS} component={Components.Settings} />
          <Route path={Routes.LOG_IN} component={Components.LogIn} />
          <Route path={Routes.SIGN_UP} component={Components.SignUp} />
          <Route path={Routes.PASSWORD_RESET} component={Components.PasswordReset} />
          {!isEmpty(auth) && profile.admin && <Route path={Routes.ADMIN} component={Components.Admin} />}
        </div>
      </>
    );
  };

  return (
    <>
      <HashRouter>
        <div className={classes.loadingContainer} style={{ opacity: show ? '0.0' : '1.0' }}>
          <Icon
            path={IconSet.fit}
            className={classes.loading}
            fill={Grayscale[fill]}
            viewBox='0 0 68 68'
            style={{ opacity: show ? '0.0' : '1.0' }}
          />
        </div>
        {isLoaded(auth) && show && <Header />}
      </HashRouter>
    </>
  );
};

export default App;
