import React, { useEffect, useState, useRef } from 'react';
import SubPanel from './SubPanel';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { sizeConstants, useSubPanelData } from '../../../config';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

const MenuPanel = () => {
  const { menuVisible, screenInfo } = useSelector(state => state.view);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const scrollRef = useRef(null);
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    menuPanel: {
      position: 'absolute',
      bottom: '-10px',
      width: '100%',
      borderTop: `3px solid ${theme.text}`,
      margin: '0px',
      transition: 'height 0.5s',
      backgroundColor: theme.background,
      overflowY: 'scroll',
      display: 'flex',
      boxSizing: 'border-box',
      zIndex: '3',
      height: `${menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px'}`
    },
    navIcon: {
      margin: '20px',
      width: '20px',
      height: '20px',
      display: 'inline-block'
    },
    iconContainer: {
      backgroundColor: theme.background,
      boxSizing: 'border-box',
      height: '50%',
      display: 'flex',
      alignItems: 'center',
      transition: '0.2s',
      border: 'none',
      borderBottom: `1px solid ${theme.text}`,
      cursor: 'pointer',
      outline: 'none',
      '& :hover': {
        opacity: '0.6'
      }
    },
    show: {
      height: '100%',
      minWidth: `${screenInfo.width < 500 ? '80%' : '50%'} !important`
    },
    navIcons: {
      margin: '0px 15px 0px 15px',
      width: '60px',
      minWidth: showSideMenu ? `${screenInfo.width < 500 ? '80%' : '50%'}` : '60px',
      height: '100%',
      justifyContent: 'center',
      transition: '0.5s'
    },
    ellipsisIcon: {
      color: theme.text,
      margin: '0px 0px 0px 15px',
      width: '15px',
      height: '15px',
      display: 'inline-block'
    }
  });

  const classes = useStyles();
  const subPanelData = useSubPanelData();

  /**
   * Set scroll to be just past the settings menu by default
   */
  useEffect(() => {
    setScroll();
    function setScroll() {
      if (scrollRef.current)
        document.querySelector('#menuPanel').scrollTo({ left: scrollRef.current.offsetWidth + 30, behavior: 'smooth' });
    }
  }, []);

  return (
    <div id='menuPanel' className={classes.menuPanel}>
      <div className={classes.navIcons} ref={scrollRef}>
        <button
          className={`${classes.iconContainer} ${showSideMenu ? classes.show : null}`}
          onClick={() => setShowSideMenu(!showSideMenu)}
        >
          <Icon className={classes.navIcon} path={IconSet.settings} viewBox='0 0 50 50' fill={theme.text} />
        </button>
        {!showSideMenu && (
          <div className={classes.iconContainer}>
            <h3 className={classes.ellipsisIcon}>...</h3>
          </div>
        )}
      </div>
      {subPanelData.map((subPanel, index) => {
        return <SubPanel data={subPanel} key={index} />;
      })}
    </div>
  );
};

export default MenuPanel;
