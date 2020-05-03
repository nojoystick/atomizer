import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/menus/navbar/Navbar';
import Theme from './stylesheets/Theme';
import Audio from './audio/Audio';
import { defaultConfig } from './config';
import { useFirestore, useFirestoreConnect, isEmpty } from 'react-redux-firebase';
import useLoadFirestoreValues from './utils/useLoadFirestoreValues';
import useResizer from './utils/useResizer';
import './stylesheets/App.scss';

const App = () => {
  const [_theme, setTheme] = useState(null);
  const [_hotkeys, setHotkeys] = useState(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const login = useSelector(state => state.config.login);
  const id = !profile.isEmpty ? profile.email : 'default';

  useFirestoreConnect(() => [{ collection: 'config', doc: id }]);
  const config = useSelector(state => state.firestore.ordered.config);
  useLoadFirestoreValues(_theme, _hotkeys, auth);
  const firestore = useFirestore();

  const theme = useSelector(state => state.network.theme);
  const targetElement = document.querySelector('#root');
  targetElement.style.backgroundColor = theme && theme.background;
  disableBodyScroll(targetElement);

  useResizer();

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

      configRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          configRef.set(defaultConfig);
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
      Audio.preampGainNode.connect(Audio.masterGainNode);
      Audio.masterGainNode.connect(Audio.context.destination);
      Audio.monkeyPatch();
      Audio.unlockAudioContext();
    };
    initializeMasterGain();
  }, []);

  return (
    <HashRouter>
      <LoadingScreen show={showLoadingScreen} />
      {!showLoadingScreen && <Navbar />}
    </HashRouter>
  );
};

export default App;
