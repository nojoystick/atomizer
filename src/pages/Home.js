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
import { setPlayer, usePreciseTimer } from '../audio/startPlayer';

const Home = () => {
  const [show, setShow] = useState(false);
  const { menuVisible, sideMenuVisible, nodeDetailVisible } = useSelector(state => state.view);
  const { theme, audio } = useSelector(state => state.network);
  const useStyles = makeStyles({
    expandIcon: {
      marginBottom: '2px',
      width: '10px',
      height: '5px',
      transition: 'transform 0.5s'
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
    setShow(true);
  }, [dispatch]);

  useHotkeys();
  useResizer();
  useElementIndexHotkeys();
  usePreciseTimer(setPlayer, bpmToMs(audio.masterTempo), audio.playing);

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

/* determine how many ms in a 32nd note for a given bpm*/
const bpmToMs = bpm => {
  return 60000 / bpm / 8;
};

export default Home;
