import React from 'react';
import '../stylesheets/SubPanel.css'

const SubPanel = ({data}) => {
  const vertical = data.sliderFields.length === 1;
  const sliderClassName = vertical ? 'slider vertical' : 'slider';
  const labelClassName = vertical ? 'sliderLabel vertical' : 'sliderLabel';
  const toggleClassName = vertical ? 'toggleContainer vertical' : 'toggleContainer';

  return (
    <div className="subPanel">
      <h1 className="titleHeader">{data.title}</h1>
      <div className="sliderContainer">
        {data.sliderFields.map((slider, index) => {
          return (
            <>
              <label className={labelClassName}>{slider.label}</label>
              <input 
                className={sliderClassName}
                type="range" 
                min={slider.min ? slider.min : 0} 
                max={slider.max ? slider.max : 128}
              />
            </>
          )
        })}
        </div>
        <div className="toggleParent">
        {data.toggleFields.map((button, index) => {
          return (
            <div className={toggleClassName}>
              <label className="sliderLabel">{button.label}</label>
              <label class="switch">
                <input type="checkbox" />
                <span class="toggleSlider"></span>
              </label>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default SubPanel;