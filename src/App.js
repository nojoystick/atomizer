import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter, Route, NavLink, useLocation } from 'react-router-dom';
import * as Components from './pages';
import LoadingScreen from './components/LoadingScreen';
import Theme from './stylesheets/Theme';
import Audio from './audio/Audio';
import * as Routes from './constants/routes';
import { defaultConfig } from './config';
import PianoRollData, { transformToPureObject } from './audio/PianoRollData';
import { useFirestore, useFirestoreConnect, isEmpty } from 'react-redux-firebase';
import useLoadFirestoreValues from './utils/useLoadFirestoreValues';
import useStyles from './AppStyles.js';
import './stylesheets/App.scss';

const Header = () => {
  const theme = useSelector(state => state.network.theme);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const classes = useStyles({ theme: theme });
  const location = useLocation();

  const getClassName = route => {
    return `${classes.toolbarItem} ${location.pathname === route && classes.active}`;
  };

  return (
    <>
      <header className={classes.titleHeader}>
        <div className={classes.floatRight}>
          <NavLink exact to={Routes.HOME} className={getClassName(Routes.HOME)}>
            home
          </NavLink>
          <NavLink to={Routes.LAB} className={getClassName(Routes.LAB)}>
            lab
          </NavLink>
          <NavLink to={Routes.ABOUT} className={getClassName(Routes.ABOUT)}>
            about
          </NavLink>
          <NavLink to={Routes.SETTINGS} className={getClassName(Routes.SETTINGS)}>
            settings
          </NavLink>
          {isEmpty(auth) && (
            <NavLink to={Routes.LOG_IN} className={getClassName(Routes.LOG_IN)}>
              log in
            </NavLink>
          )}
          {!isEmpty(auth) && profile.admin && (
            <NavLink to={Routes.ADMIN} className={getClassName(Routes.ADMIN)}>
              admin
            </NavLink>
          )}
          {!isEmpty(auth) && <Components.SignOut classes={classes} />}
        </div>
        <h1>
          <NavLink exact to='/'>
            atomizer
          </NavLink>
        </h1>
      </header>
      <div id='body' className={classes.body}>
        <Route path={Routes.HOME} exact component={Components.Home} />
        <Route path={Routes.LAB} component={Components.Lab} />
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

const App = () => {
  const [_theme, setTheme] = useState(null);
  const [_hotkeys, setHotkeys] = useState(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const login = useSelector(state => state.config.login);
  const id = !profile.isEmpty ? profile.email : 'default';

  useFirestoreConnect(() => [
    { collection: 'config', doc: id },
    { collection: 'pianoRollData', doc: id }
  ]);
  const config = useSelector(state => state.firestore.ordered.config);
  const pianoRollData = useSelector(state => state.firestore.ordered.pianoRollData);
  useLoadFirestoreValues(_theme, _hotkeys, auth, pianoRollData);
  const firestore = useFirestore();

  const theme = useSelector(state => state.network.theme);
  const targetElement = document.querySelector('#root');
  targetElement.style.backgroundColor = theme && theme.background;
  disableBodyScroll(targetElement);

  useEffect(() => {
    if (config && config[0] && _theme !== config[0].theme) {
      setTheme(Theme[config[0].theme]);
    }
    if (config && config[0] && _hotkeys !== config[0].hotkeys) {
      setHotkeys(config[0].hotkeys);
    }
  }, [_hotkeys, _theme, config]);

  useEffect(() => {
    if (config && config.length === 0) {
      setTheme(Theme[defaultConfig.theme]);
    }
    if (config && config[0]) {
      setTimeout(() => setShowLoadingScreen(false), 3000);
    }
  }, [config]);

  useEffect(() => {
    setShowLoadingScreen(true);
    setTimeout(() => setShowLoadingScreen(false), 3000);

    // if it's a first time login, initialize values
    if (login.valid) {
      const configRef = firestore.collection('config').doc(id);
      const pianoRollRef = firestore.collection('pianoRollData').doc(id);

      configRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          configRef.set(defaultConfig);
        }
      });

      pianoRollRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          pianoRollRef.set(transformToPureObject(PianoRollData));
        }
      });
    }
  }, [firestore, id, login, login.valid]);

  useEffect(() => {
    if (!isEmpty(auth) && !isEmpty(profile)) {
    }
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

  return (
    <HashRouter>
      <LoadingScreen show={showLoadingScreen} />
      {!showLoadingScreen && <Header />}
    </HashRouter>
  );
};

export default App;
