import React, { useEffect, useState, useRef } from 'react';
import SubPanel from './SubPanel';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { useSubPanelData } from '../../../config';
import { useSelector } from 'react-redux';
import MenuStyles from './MenuStyles';

const MenuPanel = ({ show }) => {
  const { menuVisible, labVisible, screenInfo } = useSelector(state => state.view);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const scrollRef = useRef(null);
  const theme = useSelector(state => state.network.theme);

  const classes = MenuStyles({ theme: theme, menuVisible: show || menuVisible, labVisible: labVisible, screenInfo: screenInfo });
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
          <Icon className={classes.navIcon} path={IconSet.settings} viewBox='0 0 50 50' fill={theme && theme.text} />
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
