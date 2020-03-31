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
import { volume } from '../../../constants/frequencies';
import PlayerStyles from './PlayerStyles';

const tempoBounds = {
  min: 6,
  max: 400
};

const volumeBounds = {
  min: 0,
  max: 127
};

const Player = ({ id, left, top, hideSourceOnDrag, setInteractible }) => {
  const { masterGain, masterTempo, playing } = useSelector(state => state.network.audio);
  const theme = useSelector(state => state.network.theme);

  const [isDraggable, setIsDraggable] = useState(true);
  const [renderSlider, setRenderSlider] = useState(Math.random());
  const [localTempo, setLocalTempo] = useState(masterTempo);
  const [localVolume, setLocalVolume] = useState(masterGain);

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

  const verify = (action, min, max, e) => {
    if (e.key === 'Enter') {
      let val = e.target.id === 'masterVolume' ? parseFloat(e.target.value) : parseInt(e.target.value);
      if (val > max) {
        val = max;
      } else if (val < min) {
        val = min;
      }
      dispatch(action(val));
      setRenderSlider(Math.random());
    }
  };

  /** only pass the value to redux on mouseUp/keyUp */
  function sliderUp(action, e) {
    dispatch(action(e.target.value, e.target.id === 'masterVolume' ? 'MIDI' : null));
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
      <div className={classes.sliderGroup}>
        <label className={classes.sliderLabel}>Volume</label>
        <input
          className={classes.input}
          type='number'
          id='masterVolume'
          key={localVolume}
          min={volumeBounds.min}
          max={volumeBounds.max}
          defaultValue={localVolume.toFixed(2)}
          onKeyDown={e => verify(networkActions.setMasterVolume, volumeBounds.min, volumeBounds.max / 127, e)}
        />
        <input
          className={`slider ${classes.slider}`}
          type='range'
          id='masterVolume'
          key={renderSlider}
          min={volumeBounds.min}
          max={volumeBounds.max}
          defaultValue={masterGain * 127}
          onFocus={() => setIsDraggable(false)}
          onBlur={() => setIsDraggable(true)}
          onChange={e => setLocalVolume(volume[e.target.value])}
          onMouseUp={e => sliderUp(networkActions.setMasterVolume, e)}
          onKeyUp={e => sliderUp(networkActions.setMasterVolume, e)}
        />
      </div>
      <div className={classes.sliderGroup}>
        <label className={classes.sliderLabel}>Tempo</label>
        <input
          className={classes.input}
          type='number'
          id='masterVolume'
          key={localTempo}
          min={tempoBounds.min}
          max={tempoBounds.max}
          defaultValue={localTempo}
          onKeyDown={e => verify(networkActions.setTempo, tempoBounds.min, tempoBounds.max, e)}
        />
        <input
          className={`slider ${classes.slider}`}
          type='range'
          key={renderSlider}
          min={tempoBounds.min}
          max={tempoBounds.max}
          defaultValue={masterTempo}
          onFocus={() => setIsDraggable(false)}
          onBlur={() => setIsDraggable(true)}
          onChange={e => setLocalTempo(e.target.value)}
          onMouseUp={e => sliderUp(networkActions.setTempo, e)}
          onKeyUp={e => sliderUp(networkActions.setTempo, e)}
        />
      </div>
    </div>
  );
};

export default Player;
