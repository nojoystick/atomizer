import React from 'react';
import '../stylesheets/SubPanel.css'

const Settings = () => {
  return (
      <div className='textContainer center'>
        <label className="sliderLabel">theme</label>
          <label class="switch">
            <input type="checkbox" />
            <span class="toggleSlider"></span>
          </label>
        </div>
  )
}

export default Settings;