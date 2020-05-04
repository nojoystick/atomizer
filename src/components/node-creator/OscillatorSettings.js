import React from 'react';
import { useSelector } from 'react-redux';
import OscillatorSettingsStyles from './OscillatorSettingsStyles';
import { VolumeData } from './panel-data';
import InputSlider from '../InputSlider';

const OscillatorSettings = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const theme = useSelector(state => state.network.theme);
  const useStylesProps = { theme: theme };
  const classes = OscillatorSettingsStyles(useStylesProps);

  return (
    <div className={classes.content} key={elementIndex}>
      {node &&
        Object.values(VolumeData(node)).map(inputSlider => {
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

export default OscillatorSettings;
