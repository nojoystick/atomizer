import React, { useState } from 'react';
import { networkActions } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { volume } from '../constants/frequencies';

const InputSlider = ({
  useStyles,
  useStylesProps,
  label,
  min,
  max,
  decimals,
  defaultValue,
  defaultValueConversion,
  onChange,
  setDraggable,
  global
}) => {
  const audio = useSelector(state => state.network.audio);
  const theme = useSelector(state => state.network.theme);
  const [renderSlider, setRenderSlider] = useState(Math.random());
  const [localAudio, setLocalAudio] = useState(global ? audio[defaultValue] : defaultValue);

  const dispatch = useDispatch();
  const classes = useStyles(useStylesProps ? useStylesProps : { theme: theme });

  /** only pass the value to redux on mouseUp/keyUp */
  function sliderUp(action, e) {
    dispatch(action(e.target.value, e.target.id === 'masterVolume' ? 'MIDI' : null));
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

  return (
    <div className={classes.sliderGroup}>
      <label className={classes.sliderLabel}>{label}</label>
      <input
        className={classes.input}
        type='number'
        id={label}
        key={localAudio}
        min={min}
        max={max}
        defaultValue={localAudio.toFixed ? localAudio.toFixed(decimals) : localAudio}
        onKeyDown={e => verify(onChange, min, max / defaultValueConversion, e)}
      />
      <input
        className={`slider ${classes.slider}`}
        type='range'
        id={label}
        key={renderSlider}
        min={min}
        max={max}
        defaultValue={parseInt(defaultValue * defaultValueConversion)}
        onFocus={setDraggable ? () => setDraggable(false) : null}
        onBlur={setDraggable ? () => setDraggable(true) : null}
        onChange={e => setLocalAudio(defaultValueConversion === 1 ? e.target.value : volume[e.target.value])}
        onMouseUp={global ? e => sliderUp(networkActions.setMasterVolume, e) : null}
        onKeyUp={global ? e => sliderUp(networkActions.setMasterVolume, e) : null}
      />
    </div>
  );
};

export default InputSlider;
