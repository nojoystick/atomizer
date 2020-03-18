import React, { useState } from 'react';
import '../../../stylesheets/SideMenuPanel.scss';
import { sizeConstants, sideMenuData } from '../../../config';
import { useSelector } from 'react-redux';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import ColorVariables from '../../../stylesheets/Colors.scss';
import SideMenuCategoryContainer from './SideMenuCategoryContainer';

const iconColor = ColorVariables.text;

const categoryMap = {
  INTERACT: true,
  MODE: true,
  VIEW: true
};

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible, screenInfo } = useSelector(state => state.view);
  const [categoryVisible, setCategoryVisible] = useState(categoryMap);

  const menuStyle = {
    width: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'}`,
    height: screenInfo.height - sizeConstants.HEADER_SIZE + 8 - (menuVisible ? sizeConstants.BOTTOM_MENU_SIZE : 0)
  };

  const toggleCategoryClassName = key => {
    setCategoryVisible({
      ...categoryVisible,
      [key]: (categoryVisible[key] = !categoryVisible[key])
    });
  };

  return (
    <div id='sideMenuPanel' className='sideMenuPanel' style={menuStyle}>
      <h2 className='editorHeader'>network editor</h2>
      <div className='networkButtons floatRight'>
        {Object.keys(sideMenuData).map((key, i) => {
          return (
            <div key={i}>
              <button className='categoryHeader' onClick={() => toggleCategoryClassName(key)}>
                <h3>{key}</h3>
                <Icon
                  className='showHideIcon'
                  style={{
                    transform: `rotate(${categoryVisible[key] ? '180deg' : '0deg'})`,
                    marginRight: `${sideMenuVisible ? '20px' : '-40px'}`
                  }}
                  fill={iconColor}
                  viewBox='3 5 10 5'
                  path={IconSet.expandArrow}
                />
              </button>
              <SideMenuCategoryContainer category={key} show={categoryVisible[key]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuPanel;
