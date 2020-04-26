import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Route, NavLink } from 'react-router-dom';
import useNavbarStyles from './NavbarStyles';
import * as Components from '../../../pages';
import { Modal } from '../../modals';
import * as Routes from '../../../constants/routes';
import { isEmpty } from 'react-redux-firebase';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';

export default function Navbar() {
  const theme = useSelector(state => state.network.theme);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const { screenInfo, labVisible } = useSelector(state => state.view);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isOnHome, setIsOnHome] = useState(location.pathname === Routes.HOME);
  const classes = useNavbarStyles({ theme: theme, screenInfo: screenInfo, labVisible: labVisible, isOnHome: isOnHome });

  const getClassName = route => {
    return `${classes.toolbarItem} ${location.pathname === route && classes.active}`;
  };
  useEffect(() => {
    if (!labVisible && !screenInfo.isMobile) {
      setIsOpen(false);
    }
  }, [labVisible, screenInfo.isMobile]);

  useEffect(() => {
    const isHome = location.pathname === Routes.HOME;
    setIsOnHome(isHome);
    if (!isHome) {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      <header className={classes.titleHeader}>
        <button
          className={`${classes.hamburgerButton} ${
            screenInfo.isMobile || (!screenInfo.isMobile && labVisible && isOnHome) ? classes.showBurger : classes.hideBurger
          }`}
          onClick={() => (screenInfo.isMobile || (!screenInfo.isMobile && labVisible && isOnHome)) && setIsOpen(!isOpen)}
        >
          <Icon className={classes.hamburgerIcon} path={IconSet.hamburger} fill={theme && theme.text} viewBox='0 0 30 30' />
        </button>
        <div
          className={`${classes.floatRight} ${
            isOpen ? classes.show : (screenInfo.isMobile || (labVisible && isOnHome)) && classes.hide
          }`}
        >
          <NavLink exact to={Routes.HOME} className={getClassName(Routes.HOME)}>
            home
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

        <h1 className={isOpen ? classes.hide : classes.show}>
          <NavLink exact to='/'>
            atomizer
          </NavLink>
        </h1>
      </header>
      <div id='body' className={classes.body}>
        <Modal />
        <Route path={Routes.HOME} exact component={Components.Home} />
        <Route path={Routes.SETTINGS} component={Components.Settings} />
        <Route path={Routes.LOG_IN} component={Components.LogIn} />
        <Route path={Routes.SIGN_UP} component={Components.SignUp} />
        <Route path={Routes.PASSWORD_RESET} component={Components.PasswordReset} />
        {!isEmpty(auth) && profile.admin && <Route path={Routes.ADMIN} component={Components.Admin} />}
      </div>
    </>
  );
}
