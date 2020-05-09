/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../../config/ItemTypes';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { networkActions } from '../../../redux/actions';
import PlayerStyles from './PlayerStyles';
import InputSlider from '../../InputSlider';
import KeyDropdowns from '../../KeyDropdowns';
import PlayerData from './player-data';
import MuteSoloButtons from './MuteSoloButtons';
import { usePlayerHotkeys } from '../../../utils/hotkeys';

const Player = ({ id, left, top, hideSourceOnDrag, setInteractible }) => {
  const somethingIsMuted = useSelector(state => state.network.audio.somethingIsMuted);
  const somethingIsSoloed = useSelector(state => state.network.audio.somethingIsSoloed);
  const playing = useSelector(state => state.network.audio.playing);
  const theme = useSelector(state => state.network.theme);
  const { screenInfo, labVisible } = useSelector(state => state.view);

  const [isDraggable, setIsDraggable] = useState(true);
  const styleProps = {
    theme: theme,
    solo: somethingIsSoloed,
    mute: somethingIsMuted,
    screenInfo: screenInfo,
    labVisible: labVisible
  };
  const classes = PlayerStyles(styleProps);
  const dispatch = useDispatch();
  usePlayerHotkeys();

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
      <div className={classes.block}>
        <span className={classes.row}>
          <button className={classes.button} onClick={() => dispatch(networkActions.playOrPause())}>
            <Icon
              className={classes.playIcon}
              fill={theme && theme.text}
              viewBox='0 0 300 300'
              path={playing ? IconSet.pause : IconSet.play}
            />
          </button>
          <button className={`${classes.button} ${classes.stopButton}`} onClick={() => dispatch(networkActions.stop())}>
            <Icon className={classes.stopIcon} fill={theme && theme.text} viewBox='0 0 300 300' path={IconSet.stop} />
          </button>
        </span>
        <span className={classes.rowNoPadding}>
          <KeyDropdowns />
        </span>
      </div>
      <div className={classes.msContainer}>
        <MuteSoloButtons
          mute={somethingIsMuted}
          solo={somethingIsSoloed}
          onMute={networkActions.setMuted}
          onSolo={networkActions.setSoloed}
          redux
        />
      </div>
      {PlayerData.map(inputSlider => {
        return (
          <InputSlider
            key={inputSlider.max}
            useStyles={PlayerStyles}
            useStylesProps={styleProps}
            {...inputSlider}
            setDraggable={setIsDraggable}
          />
        );
      })}
    </div>
  );
};

export default Player;
