import React from 'react';
import { useSelector } from 'react-redux';
import NodeCreatorModalStyles from './NodeCreatorModalStyles';

const OscillatorSettings = () => {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);

  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });

  return (
    <div className={classes.content}>
      <h3 className={classes.title}>oscillator settings</h3>
    </div>
  );
};

export default OscillatorSettings;
