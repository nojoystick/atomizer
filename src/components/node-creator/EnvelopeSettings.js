import React from 'react';
import { useSelector } from 'react-redux';
import OscillatorSettingsStyles from './OscillatorSettingsStyles';
import { EnvelopeData } from './panel-data';
import InputSlider from '../InputSlider';

const EnvelopeSettings = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const theme = useSelector(state => state.network.theme);
  const useStylesProps = { theme: theme };
  const classes = OscillatorSettingsStyles(useStylesProps);

  return (
    <div className={`${classes.content} ${classes.envelope}`} key={elementIndex + 100}>
      {node &&
        Object.values(EnvelopeData(node)).map((inputSlider, index) => {
          return (
            <InputSlider
              key={inputSlider.key}
              useStyles={OscillatorSettingsStyles}
              useStylesProps={useStylesProps}
              {...inputSlider}
            />
          );
        })}
    </div>
  );
};

export default EnvelopeSettings;
