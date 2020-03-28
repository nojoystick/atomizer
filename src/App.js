import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Home, About, Settings, LogIn, SignUp, SignOut, PasswordReset } from './pages';
import { makeStyles } from '@material-ui/styles';
import Audio from './audio/Audio';
import * as Routes from './constants/routes';
import './stylesheets/App.scss';

const App = () => {
  const user = useSelector(state => state.config.user);
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
    },
    toolbarItem: {
      marginLeft: '20px',
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
            <NavLink to={Routes.ABOUT} className={classes.toolbarItem}>about</NavLink>
            <NavLink to={Routes.SETTINGS} className={classes.toolbarItem}>settings</NavLink>
            {!user && <NavLink to={Routes.LOG_IN} className={classes.toolbarItem}>log in</NavLink>}
            {user && <SignOut classes={classes}/>}
          </div>
          <h1>
            <NavLink exact to='/'>
              atomizer
            </NavLink>
          </h1>
        </header>
        <div id='body' className={classes.body}>
          <Route path={Routes.HOME} exact component={Home} />
          <Route path={Routes.ABOUT} component={About} />
          <Route path={Routes.SETTINGS} component={Settings} />
          <Route path={Routes.LOG_IN} component={LogIn} />
          <Route path={Routes.SIGN_UP} component={SignUp} />
          <Route path={Routes.PASSWORD_RESET} component={PasswordReset} />
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
