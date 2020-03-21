/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Network from '../components/network/Network';
import MenuPanel from '../components/menus/main/MenuPanel';
import SideMenuPanel from '../components/menus/network-editor/SideMenuPanel';
import NodeDetailPanel from '../components/menus/node-detail/NodeDetailPanel';
import PlayerContainer from '../components/menus/player/PlayerContainer';
import Modal from '../components/Modal';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import { sizeConstants } from '../config';
import { useResizer, useHotkeys, useElementIndexHotkeys } from '../utils/hotkeys';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';
import { makeStyles } from '@material-ui/styles';

const Home = () => {
  const [show, setShow] = useState(false);
  const { textVisible, menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    textFlexContainer: {
      position: 'relative',
      float: 'left',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '20px',
      margin: '-13px 0px 0px 20px',
      padding: '0px',
      zIndex: '2',
      opacity: '1',
      color: 'inherit',
      backgroundColor: 'inherit',
      height: `${textVisible ? '100%' : '30px'}`,
      maxWidth: `${textVisible ? '500px' : '160px'}`,
      transition: `${textVisible ? 'max-width 0s' : 'max-width 4s'}, 0.3s`,
      '&:hover': {
        opacity: '0.4'
      }
    },
    disappearingText: {
      display: 'inline-block',
      transition: '0.5s',
      zIndex: '2',
      opacity: textVisible ? '1.0' : '0.0',
      visibility: textVisible ? 'visible' : 'hidden',
      height: textVisible ? (screenInfo.width < screenInfo.breakpoint ? '120px' : '70px') : '0px'
    },
    expandIcon: {
      marginBottom: '2px',
      width: '10px',
      height: '5px',
      transition: 'transform 0.5s'
    },
    textHideShowIcon: {
      display: 'inline-block',
      padding: '0px',
      width: '16px',
      height: '8px',
      margin: '8px 0px 2px 0px',
      marginTop: `${textVisible ? '8px' : '0px'}`,
      transition: 'opacity 0.5s ease'
    },
    button: {
      position: 'absolute',
      outline: 'none',
      transition: 'bottom 0.5s, left 0.5s, right 0.5s',
      backgroundColor: theme.background,
      color: theme.text,
      zIndex: 3,
      boxSizing: 'border-box',
      '&:hover': {
        opacity: 0.6
      }
    },
    menuButton: {
      width: '100px',
      height: '36px',
      left: '40px',
      border: `solid ${theme.text}`,
      borderWidth: '2px 2px 0px 2px',
      bottom: `${menuVisible ? sizeConstants.BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'}`,
      right: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px' : '40px'}`
    },
    sideMenuButton: {
      top: '52px',
      width: '36px',
      height: '100px',
      marginLeft: '40px',
      border: `solid ${theme.text}`,
      borderWidth: '2px 0px 2px 2px',
      right: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 4 + 'px' : '-6px'}`
    }
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewActions.setTextVisible(true));
    setShow(true);
  }, [dispatch]);

  useHotkeys();
  useResizer();
  useElementIndexHotkeys();

  const getExpandIcon = (className, rotation, visible) => {
    return (
      <Icon
        className={className}
        style={{ transform: `rotate(${visible ? rotation[0] + 'deg' : rotation[1] + 'deg'})` }}
        fill={theme.text}
        viewBox='3 5 10 5'
        path={IconSet.expandArrow}
      />
    );
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <PlayerContainer hideSourceOnDrag={true} />
      <Modal />
      <div
        className={classes.textFlexContainer}
        onClick={() => {
          dispatch(viewActions.setTextVisible(!textVisible));
        }}
      >
        <p className={classes.disappearingText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea quas maiores adipisci doloremque impedit illum illo
          natus mollitia possimus blanditiis accusantium, ut nostrum. Voluptates modi eum maiores repellat molestias!
        </p>
        {getExpandIcon(classes.textHideShowIcon, [0, 180], textVisible)}
      </div>

      <Network />
      <SideMenuPanel />
      <MenuPanel />
      <NodeDetailPanel />

      <button
        className={`${classes.button} ${classes.sideMenuButton}`}
        onClick={() => dispatch(viewActions.setSideMenuVisible(!sideMenuVisible))}
      >
        {getExpandIcon(classes.expandIcon, [90, 270], sideMenuVisible)}
      </button>
      <button
        className={`${classes.button} ${classes.menuButton}`}
        onClick={() => dispatch(viewActions.setMenuVisible(!menuVisible))}
      >
        {getExpandIcon(classes.expandIcon, [180, 0], menuVisible)}
      </button>
      <button
        className={`${classes.button} ${classes.menuButton}`}
        style={getDetailStyle(menuVisible, sideMenuVisible)}
        onClick={() => dispatch(viewActions.setNodeDetailVisible(!nodeDetailVisible))}
      >
        {getExpandIcon(classes.expandIcon, [180, 0], nodeDetailVisible)}
      </button>
    </div>
  );
};

const getDetailStyle = (menuVisible, sideMenuVisible) => {
  return {
    left: 'unset',
    right: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px' : '40px'}`
  };
};

export default Home;
