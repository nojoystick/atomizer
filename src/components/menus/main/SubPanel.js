import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SubPanelStyles from './SubPanelStyles';

const SubPanel = ({ data }) => {
  const theme = useSelector(state => state.network.theme);
  const vertical = data.sliderFields.length === 1;
  const sliderClassName = vertical ? 'slider vertical' : 'slider';
  const toggleClassName = vertical ? 'toggleParent vertical' : 'toggleParent';

  const classes = SubPanelStyles({ theme: theme });
  const dispatch = useDispatch();

  const _onChange = (slider, e) => {
    if (slider.action) {
      dispatch(slider.action(e.target.value));
    }
  };

  return (
    <div className={classes.subPanel}>
      <div className={classes.titleHeader}>
        <h3>{data.title}</h3>
        <h4 className={classes.subtitle}>{data.subtitle}</h4>
      </div>
      <div className='sliderParent'>
        {data.sliderFields.map((slider, index) => {
          return (
            <div className='sliderContainer' key={index}>
              <label className={`${classes.sliderLabel} ${vertical ? classes.vertical : null}`}>{slider.label}</label>
              <input
                className={sliderClassName}
                type='range'
                min={slider.min ? slider.min : 0}
                max={slider.max ? slider.max : 127}
                defaultValue={slider.value ? slider.value : 50}
                onChange={e => _onChange(slider, e)}
              />
            </div>
          );
        })}
      </div>
      <div className={toggleClassName}>
        {data.toggleFields.map((button, index) => {
          return (
            <div className='toggleContainer' key={index}>
              <label className={classes.sliderLabel}>{button.label}</label>
              <label className='switch'>
                <input type='checkbox' />
                <span className='toggleSlider'></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubPanel;
