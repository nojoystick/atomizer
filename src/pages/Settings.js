import React, { useState, useEffect } from 'react';
import '../stylesheets/SubPanel.scss';

const Settings = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const onChange = () => {
    // todo: gotta reimplement the theme in a better way
    // if (!darkTheme) {
    //   require('../stylesheets/DarkTheme.scss');
    // }
    // if (darkTheme) {
    //   window.location.reload();
    // }
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        <div className='sliderLabel'>theme</div>
        <label className='switch'>
          <input type='checkbox' onChange={() => onChange()} />
          <span className='toggleSlider'></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
