/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDrop } from 'react-dnd';
import Player from './Player';
import ItemTypes from '../../../config/ItemTypes';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { sizeConstants } from '../../../config/';
const PlayerContainer = () => {
  const screenInfo = useSelector(state => state.view.screenInfo);
  const [player, setPlayer] = useState({ id: uuidv4(), top: screenInfo.height - 150, left: screenInfo.width / 2 - 225 });
  const [interactible, setInteractible] = useState(false);

  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      move(left, top);
      return undefined;
    }
  });

  const move = (left, top) => {
    setPlayer({ left, top });
  };

  const useStyles = makeStyles({
    background: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%!important',
      height: '100% !important',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '7999',
      visibility: interactible ? 'visible' : 'hidden'
    }
  });

  const classes = useStyles();
  useRepositioner({ player, interactible, setInteractible, move });

  return (
    <div ref={drop} className={classes.background}>
      <Player id={player.id} left={player.left} top={player.top} hideSourceOnDrag={true} setInteractible={setInteractible} />
    </div>
  );
};

const useRepositioner = ({ player, interactible, setInteractible, move }) => {
  const { screenInfo, labVisible, menuVisible } = useSelector(state => state.view);

  /**
   * Keep editor on screen even when resized
   */
  useEffect(() => {
    if (!screenInfo.isMobile) {
      move(screenInfo.width / 2 - 225, player.top);
    }
  }, [screenInfo.width]);

  useEffect(() => {
    if (!screenInfo.isMobile) {
      move(player.left, screenInfo.height - 150);
    }
  }, [screenInfo.height]);

  /**
   * If screen is mobile, lock the player in place at the bottom
   */
  useEffect(() => {
    if (screenInfo.isMobile && !menuVisible && !labVisible) {
      setInteractible(false);
      move(0, screenInfo.height - 80);
    }
  }, [screenInfo, interactible]);

  /**
   * If lab is open (desktop), lock the player in place
   */
  useEffect(() => {
    if ((labVisible && !menuVisible && !screenInfo.isMobile) || (screenInfo.isMobile && !labVisible && !menuVisible)) {
      move(0, screenInfo.height - 80);
    }
  }, [labVisible, menuVisible, screenInfo, interactible]);

  /**
   * Bump the player around if the bottom menu is open
   */
  useEffect(() => {
    if ((menuVisible && (labVisible || screenInfo.isMobile)) || (screenInfo.isMobile && (menuVisible || labVisible))) {
      move(0, sizeConstants.HEADER_SIZE + 41);
    } else if (menuVisible) {
      move(0, screenInfo.height - sizeConstants.BOTTOM_MENU_SIZE - 80);
    } else if (!screenInfo.isMobile && !menuVisible && !labVisible) {
      move(screenInfo.width / 2 - 225, screenInfo.height - 150);
    } else if (!menuVisible) {
      move(0, screenInfo.height - 80);
    }
  }, [menuVisible]);

  /**
   * Bump the player around if the lab is open
   */
  useEffect(() => {
    if ((menuVisible && (labVisible || screenInfo.isMobile)) || (screenInfo.isMobile && (menuVisible || labVisible))) {
      move(0, sizeConstants.HEADER_SIZE + 41);
    } else if (labVisible && !screenInfo.isMobile) {
      move(0, screenInfo.height - 80);
    } else if (labVisible && menuVisible) {
      move(0, sizeConstants.HEADER_SIZE + 41);
    } else if (!labVisible && !menuVisible && !screenInfo.isMobile) {
      move(screenInfo.width / 2 - 225, screenInfo.height - 150);
    }
  }, [labVisible]);
};

export default PlayerContainer;
