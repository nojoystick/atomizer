import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Select from 'react-select';
import './AutomationStyles.scss';

const useAutomationStyles = makeStyles({
  dropdown: {
    maxWidth: '300px',
    textAlign: 'right',
    backgroundColor: 'transparent !important',
    color: props => props.theme && props.theme.text,
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    border: 'none !important',
    boxShadow: props => props.theme && props.theme.boxShadowLight,
    flexGrow: 1,
    '& div': {
      color: 'inherit'
    }
  }
});

export default function Dropdown({ parameterToAutomate, setParameterToAutomate }) {
  const [automationOptions, setAutomationOptions] = useState(null);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const theme = useSelector(state => state.network.theme);
  const classes = useAutomationStyles(theme);

  useEffect(() => {
    if (node) {
      const automationOptions = getAutomationOptions(node);
      setAutomationOptions(automationOptions, theme);
      if (!parameterToAutomate) {
        setParameterToAutomate(automationOptions[0]);
      }
    }
  }, [node, parameterToAutomate, setParameterToAutomate, theme]);

  const customStyles = {
    option: (provided, state) => {
      return {
        ...provided,
        filter: theme && state.data.isActive && 'brightness: 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '&:before': {
          color: theme && state.data.isActive && `${theme[state.data.activeColor]} !important`,
          backgroundColor: theme && state.data.isActive && theme[state.data.activeColor],
          borderRadius: 6,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 6,
          width: 6
        }
      };
    }
  };

  const _onChange = e => {
    setParameterToAutomate(e);
  };

  return (
    <Select
      className={classes.dropdown}
      classNamePrefix='dropdown'
      styles={customStyles}
      isSearchable={false}
      instanceId='dropdown'
      options={automationOptions}
      value={parameterToAutomate}
      onChange={_onChange}
    />
  );
}

const getAutomationOptions = node => {
  return [
    {
      label: 'volume',
      value: node.setVolume.bind(node),
      key: 'volumeAutomation',
      isActive: node.automationEnabled.volumeAutomation,
      activeColor: 'nonMetal'
    },
    {
      label: 'pan',
      value: node.setPan.bind(node),
      key: 'panAutomation',
      isActive: node.automationEnabled.panAutomation,
      activeColor: 'nobleGas'
    },
    {
      label: 'high pass filter frequency',
      value: node.setHPFilterFrequency.bind(node),
      key: 'hpFilterFrequencyAutomation',
      isActive: node.automationEnabled.hpFilterFrequencyAutomation,
      activeColor: 'alkaliMetal'
    },
    {
      label: 'high pass filter Q',
      value: node.setHPFilterQ.bind(node),
      key: 'hpFilterQAutomation',
      isActive: node.automationEnabled.hpFilterQAutomation,
      activeColor: 'transitionMetal'
    },
    {
      label: 'low pass filter frequency',
      value: node.setLPFilterFrequency.bind(node),
      key: 'lpFilterFrequencyAutomation',
      isActive: node.automationEnabled.lpFilterFrequencyAutomation,
      activeColor: 'postTransitionMetal'
    },
    {
      label: 'low pass filter Q',
      value: node.setLPFilterFrequency.bind(node),
      key: 'lpFilterQAutomation',
      isActive: node.automationEnabled.lpFilterQAutomation,
      activeColor: 'metalloid'
    }
  ];
};
