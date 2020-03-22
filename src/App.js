import React, { useEffect } from 'react';
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import IconSet from './constants/icon-set';
import Icon from './components/Icon';
import Settings from './pages/Settings';
import { makeStyles } from '@material-ui/styles';
import './stylesheets/App.scss';
import { useSelector } from 'react-redux';
import Audio from './audio/Audio';

const App = () => {
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    titleHeader: {
      fontSize: '20px',
      padding: '10px 20px 0px 20px',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      color: theme.text,
      zIndex: '2',
      position: 'relative',
      verticalAlign: 'bottom'
    },
    floatRight: {
      float: 'right',
      verticalAlign: 'middle'
    },
    settingsIcon: {
      margin: '0px 0px 0px 30px',
      width: '15px',
      height: '13px'
    },
    infoIcon: {
      margin: '0px 0px 0px 30px',
      width: '14px',
      height: '14px'
    },
    body: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.background,
      color: theme.text
    }
  });

  const classes = useStyles();
  const targetElement = document.querySelector('#root');
  targetElement.style.backgroundColor = theme.background;
  disableBodyScroll(targetElement);

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
            <NavLink to='/about'>about</NavLink>
            <NavLink to='/settings'>
              <Icon className={classes.settingsIcon} path={IconSet.settings} viewBox='0 0 50 48' fill={theme.text} />
            </NavLink>
            <NavLink to='/'>
              <Icon className={classes.infoIcon} path={IconSet.info} viewBox='0 0 25 23' fill={theme.text} />
            </NavLink>
          </div>
          <h1>
            <NavLink exact to='/'>
              atomizer
            </NavLink>
          </h1>
        </header>
        <div id='body' className={classes.body}>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/settings' component={Settings} />
        </div>
      </>
    );
  };

  return (
    <HashRouter>
      <Header />
    </HashRouter>
  );
};

export default App;
