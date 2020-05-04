/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Network from '../components/network/Network';
import MenuPanel from '../components/menus/main/MenuPanel';
import Lab from '../components/node-creator/Lab';
import PlayerContainer from '../components/menus/player/PlayerContainer';
import EditorContainer from '../components/menus/network-editor/EditorContainer';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import { useResizer, useHotkeys, useElementIndexHotkeys } from '../utils/hotkeys';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';
import usePlayer from '../audio/usePlayer';
import HomeStyles from './HomeStyles';

const Home = () => {
  const [show, setShow] = useState(false);
  const { menuVisible, labVisible, screenInfo } = useSelector(state => state.view);
  const modalVisible = useSelector(state => state.network.modalVisible);
  const theme = useSelector(state => state.network.theme);
  const audio = useSelector(state => state.network.audio);

  const classes = HomeStyles({ theme: theme, menuVisible: menuVisible, labVisible: labVisible, screenInfo: screenInfo });
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
  }, []);

  useHotkeys(audio.nodeData && Object.keys(audio.nodeData).length > 0 && !modalVisible);
  useResizer();
  useElementIndexHotkeys();
  usePlayer();

  const getExpandIcon = (visible, rotation) => {
    return (
      <Icon
        className={classes.expandIcon}
        style={{ transform: `rotate(${visible ? rotation[0] + 'deg' : rotation[1] + 'deg'})` }}
        fill={theme && theme.text}
        viewBox='3 5 10 5'
        path={IconSet.expandArrow}
      />
    );
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <PlayerContainer />
      <EditorContainer />
      <Network />
      <MenuPanel />
      <Lab />
      <button
        className={`${classes.button} ${classes.menuButton} ${screenInfo.isMobile && classes.menuButtonMobile}`}
        onClick={() => dispatch(viewActions.setMenuVisible(!menuVisible))}
      >
        {getExpandIcon(menuVisible, [180, 0])}
      </button>
      <button
        className={`${classes.button} ${screenInfo.isMobile ? classes.labButtonMobile : classes.labButton}`}
        onClick={() => dispatch(viewActions.setLabVisible(!labVisible))}
      >
        {getExpandIcon(labVisible, screenInfo.isMobile ? [180, 0] : [90, 270])}
      </button>
    </div>
  );
};

export default Home;
