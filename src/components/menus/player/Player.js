/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { networkActions } from '../../../redux/actions';
import PlayerStyles from './PlayerStyles';
import InputSlider from '../../InputSlider';
import PlayerData from './player-data';

const Player = ({ id, left, top, hideSourceOnDrag, setInteractible }) => {
  const { playing } = useSelector(state => state.network.audio);
  const theme = useSelector(state => state.network.theme);

  const [isDraggable, setIsDraggable] = useState(true);

  const classes = PlayerStyles({ theme: theme });
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.PLAYER },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    canDrag: isDraggable
  });

  useEffect(() => {
    setInteractible(isDragging);
  }, [isDragging, setInteractible]);

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div ref={drag} className={classes.player} style={{ left, top }}>
      <button className={classes.button} onClick={() => dispatch(networkActions.playOrPause())}>
        <Icon
          className={classes.playIcon}
          fill={theme && theme.text}
          viewBox='0 0 300 300'
          path={playing ? IconSet.pause : IconSet.play}
        />
      </button>
      <button className={classes.button} onClick={() => dispatch(networkActions.stop())}>
        <Icon className={classes.stopIcon} fill={theme && theme.text} viewBox='0 0 300 300' path={IconSet.stop} />
      </button>

      {PlayerData.map(inputSlider => {
        return <InputSlider useStyles={PlayerStyles} {...inputSlider} setDraggable={setIsDraggable} />;
      })}
    </div>
  );
};

export default Player;
