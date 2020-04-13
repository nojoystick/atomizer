import React, { useState } from 'react';
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
  globalValue,
  vertical
}) => {
  const audio = useSelector(state => state.network.audio);
  const theme = useSelector(state => state.network.theme);
  const [renderSlider, setRenderSlider] = useState(Math.random());
  const [localAudio, setLocalAudio] = useState(globalValue ? audio[defaultValue] : defaultValue);

  const dispatch = useDispatch();
  const classes = useStyles(useStylesProps ? useStylesProps : { theme: theme });

  /** only pass the value to redux on mouseUp/keyUp */
  function sliderUp(action, e) {
    dispatch(action(e.target.value, e.target.id === 'volume' ? 'MIDI' : null));
  }

  function sliderChange(action, e) {
    const val = defaultValueConversion === 1 ? e.target.value : volume[e.target.value];
    setLocalAudio(val);
    if (!globalValue) {
      action(val);
    }
  }

  const verify = (action, min, max, e) => {
    if (e.key === 'Enter') {
      let val = e.target.id === 'volume' ? parseFloat(e.target.value) : parseInt(e.target.value);
      if (typeof val !== 'number') {
        return;
      }
      if (val > max) {
        val = max;
      } else if (val < min) {
        val = min;
      }
      globalValue ? dispatch(action(val)) : action(val);
      setLocalAudio(val);
      setRenderSlider(Math.random() * 1000);
    }
  };

  return (
    <div className={`${classes.sliderContainer} sliderContainer`}>
      <label className={`${classes.sliderLabel} ${classes.vertical}`}>{label}</label>
      {!vertical && (
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
      )}
      <input
        className={`slider ${classes.slider} ${vertical && 'vertical'}`}
        type='range'
        id={label}
        key={renderSlider}
        min={min}
        max={max}
        defaultValue={localAudio * defaultValueConversion}
        onFocus={setDraggable ? () => setDraggable(false) : null}
        onBlur={setDraggable ? () => setDraggable(true) : null}
        onChange={e => sliderChange(onChange, e)}
        onMouseUp={globalValue ? e => sliderUp(onChange, e) : null}
        onKeyUp={globalValue ? e => sliderUp(onChange, e) : null}
      />
      {vertical && (
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
      )}
    </div>
  );
};

export default InputSlider;
