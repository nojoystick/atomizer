import React, { useEffect, useState, useRef } from 'react';
import SubPanel from './SubPanel';
import '../../../stylesheets/MenuPanel.scss';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { sizeConstants, subPanelData } from '../../../config';
import { useSelector } from 'react-redux';

const MenuPanel = () => {
  const { menuVisible, screenInfo } = useSelector(state => state.view);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const scrollRef = useRef(null);

  const menuStyle = {
    height: `${menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px'}`
  };

  const sideMenuStyle = {
    minWidth: `${screenInfo.width < 500 ? '80%' : '50%'}`,
    transition: '0.5s'
  };

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
    <div id='menuPanel' className='menuPanel' style={menuStyle}>
      <div className='navIcons' style={showSideMenu ? sideMenuStyle : null} ref={scrollRef}>
        <button
          className={`iconContainer ${showSideMenu ? 'show' : null}`}
          onClick={() => setShowSideMenu(!showSideMenu)}
          style={{ borderBottom: '1px solid black' }}
        >
          <Icon className='navIcon' path={IconSet.settings} viewBox='0 0 50 50' fill='black' />
        </button>
        {!showSideMenu && (
          <div className='iconContainer'>
            <h3 className='ellipsisIcon'>...</h3>
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
