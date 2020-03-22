import React, { useState } from 'react';
import { sizeConstants, useSideMenuData } from '../../../config';
import { useSelector } from 'react-redux';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import SideMenuCategoryContainer from './SideMenuCategoryContainer';
import { makeStyles } from '@material-ui/styles';

const categoryMap = {
  INTERACT: true,
  MODE: true,
  VIEW: true
};

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible, screenInfo } = useSelector(state => state.view);
  const theme = useSelector(state => state.network.theme);
  const [categoryVisible, setCategoryVisible] = useState(categoryMap);

  const useStyles = makeStyles({
    sideMenuPanel: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      right: '-6px',
      width: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'}`,
      height: screenInfo.height - sizeConstants.HEADER_SIZE + 20 - (menuVisible ? sizeConstants.BOTTOM_MENU_SIZE : 0),
      borderLeft: `3px solid ${theme.text}`,
      borderTop: `3px solid ${theme.text}`,
      margin: '0px',
      transition: 'width 0.5s, height 0.5s',
      backgroundColor: theme.background,
      zIndex: 1
    },
    editorHeader: {
      padding: '5px',
      whiteSpace: 'nowrap'
    },
    categoryHeader: {
      padding: '0px',
      margin: '0px 0px 0px 5px',
      textTransform: 'lowercase',
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      verticalAlign: 'center',
      height: '30px',
      fontSize: '0.8em',
      outline: 'none',
      color: theme.text,
      '&:hover': {
        opacity: '0.4'
      }
    },
    showHideIcon: {
      float: 'right',
      margin: '5px 20px 0px 0px',
      width: '10px',
      height: '5px',
      transition: '0.5s'
    },
    networkButtons: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      float: 'right'
    },
    networkButton: {
      fontFamily: 'inconsolata',
      display: 'block',
      border: 'none',
      flexGrow: '1',
      height: '30px',
      margin: '5px 5px 5px 10px',
      fontSize: '20px',
      fontWeight: '500',
      textAlign: 'left',
      cursor: 'pointer',
      outline: 'none',
      backgroundColor: theme.background,
      color: theme.text,
      whiteSpace: 'nowrap',
      '&:hover': {
        opacity: '0.4'
      }
    }
  });

  const classes = useStyles();
  const sideMenuData = useSideMenuData();

  const toggleCategoryClassName = key => {
    setCategoryVisible({
      ...categoryVisible,
      [key]: (categoryVisible[key] = !categoryVisible[key])
    });
  };

  return (
    <div id='sideMenuPanel' className={classes.sideMenuPanel}>
      <h2 className={classes.editorHeader}>network editor</h2>
      <div className={classes.networkButtons}>
        {Object.keys(sideMenuData).map((key, i) => {
          return (
            <div key={i}>
              <button className={classes.categoryHeader} onClick={() => toggleCategoryClassName(key)}>
                <h3>{key}</h3>
                <Icon
                  className={classes.showHideIcon}
                  style={{
                    transform: `rotate(${categoryVisible[key] ? '180deg' : '0deg'})`,
                    marginRight: `${sideMenuVisible ? '20px' : '-40px'}`
                  }}
                  fill={theme.text}
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
