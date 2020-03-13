import React from 'react';
import '../stylesheets/SubPanel.scss'

const SubPanel = ({data}) => {
  const vertical = data.sliderFields.length === 1;
  const sliderClassName = vertical ? 'slider vertical' : 'slider';
  const labelClassName = vertical ? 'sliderLabel vertical' : 'sliderLabel';
  const toggleClassName = vertical ? 'toggleParent vertical' : 'toggleParent';

  return (
    <div className="subPanel">
      <div className="titleHeader">
        <h3 >{data.title}</h3>
        <h4 className="subtitle">{data.subtitle}</h4>
      </div>
      <div className="sliderParent">
        {data.sliderFields.map((slider, index) => {
          return (
            <div className='sliderContainer' key={index}>
              <label className={labelClassName}>{slider.label}</label>
              <input 
                className={sliderClassName}
                type="range" 
                min={slider.min ? slider.min : 0} 
                max={slider.max ? slider.max : 128}
              />
            </div>
          )
        })}
        </div>
        <div className={toggleClassName}>
        {data.toggleFields.map((button, index) => {
          return (
            <div className='toggleContainer' key={index}>
              <label className="sliderLabel">{button.label}</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="toggleSlider"></span>
              </label>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default SubPanel;