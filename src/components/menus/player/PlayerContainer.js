import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDrop } from 'react-dnd';
import Player from './Player';
import ItemTypes from './ItemTypes';
import { v4 as uuidv4 } from 'uuid';

const PlayerContainer = ({ hideSourceOnDrag }) => {
  const [player, setPlayer] = useState({ id: uuidv4(), top: '30px', left: 'calc(50% - 100px)' });
  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      move(item.id, left, top);
      return undefined;
    }
  });
  const move = (id, left, top) => {
    setPlayer({ left, top });
  };
  const useStyles = makeStyles({
    background: {
      transition: 'opacity 1s, visibility 0s',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%!important',
      height: '100% !important',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9996',
      pointerEvents: 'none'
    }
  });

  const classes = useStyles();

  return (
    <div ref={drop} className={classes.background}>
      <Player id={player.id} left={player.left} top={player.top} hideSourceOnDrag={hideSourceOnDrag} />
    </div>
  );
};

export default PlayerContainer;
