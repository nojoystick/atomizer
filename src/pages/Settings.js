import React, { useState } from 'react';
import '../stylesheets/SubPanel.scss';

const Settings = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const onChange = () => {
    if(!darkTheme) {
      require('../stylesheets/DarkTheme.scss');
    }
    if(darkTheme) {
      window.location.reload();
    }
    setDarkTheme(!darkTheme);
  }

  return (
      <div className='textContainer center'>
        <label className="sliderLabel">theme</label>
          <label className="switch">
            <input type="checkbox" onChange={() => onChange()}/>
            <span className="toggleSlider"></span>
          </label>
        </div>
  )
}

export default Settings;