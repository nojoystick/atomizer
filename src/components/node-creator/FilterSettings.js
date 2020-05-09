import React from 'react';
import { useSelector } from 'react-redux';
import OscillatorSettingsStyles from './OscillatorSettingsStyles';
import { HPFilterData, LPFilterData } from './panel-data';
import InputSlider from '../InputSlider';

const FilterSettings = ({ forceUpdate }) => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const theme = useSelector(state => state.network.theme);
  const useStylesProps = { theme: theme };
  const classes = OscillatorSettingsStyles(useStylesProps);

  return (
    <div className={classes.row} key={forceUpdate}>
      {node && (
        <div
          className={`${classes.content} ${node.automationEnabled.hpFilterFrequencyAutomation &&
            node.automationEnabled.hpFilterQAutomation &&
            classes.disabled}`}
          key={elementIndex + 100}
        >
          <h4>high pass filter</h4>
          {Object.values(HPFilterData(node)).map((inputSlider, index) => {
            return (
              <InputSlider
                key={inputSlider.key}
                useStyles={OscillatorSettingsStyles}
                useStylesProps={useStylesProps}
                {...inputSlider}
                smallLabel
              />
            );
          })}
        </div>
      )}
      {node && (
        <div
          className={`${classes.content} ${node.automationEnabled.lpFilterFrequencyAutomation &&
            node.automationEnabled.lpFilterQAutomation &&
            classes.disabled}`}
          key={elementIndex + 200}
        >
          <h4>low pass filter</h4>
          {Object.values(LPFilterData(node)).map((inputSlider, index) => {
            return (
              <InputSlider
                key={inputSlider.key}
                useStyles={OscillatorSettingsStyles}
                useStylesProps={useStylesProps}
                {...inputSlider}
                smallLabel
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSettings;
