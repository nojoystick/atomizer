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
  const [menuOpen, setMenuOpen] = useState(false);
  const [automationOptions, setAutomationOptions] = useState(null);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const theme = useSelector(state => state.network.theme);
  const classes = useAutomationStyles(theme);

  // useEffect(() => {
  //   const log = (option) => {
  //     console.log(option.classList);
  //   }
  //   const option = document.getElementById('react-select-dropdown-option-1');
  //   option && option.addEventListener('mouseover', () => log(option))
  //   return function cleanup(){
  //     option && option.removeEventListener('mouseover', () => log(option))
  //   }
  // }, [menuOpen])

  useEffect(() => {
    if (node) {
      const automationOptions = getAutomationOptions(node);
      setAutomationOptions(automationOptions);
      if (!parameterToAutomate) {
        setParameterToAutomate(automationOptions[0]);
      }
    }
  }, [node, parameterToAutomate, setParameterToAutomate]);

  return (
    <Select
      className={classes.dropdown}
      classNamePrefix='dropdown'
      isSearchable={false}
      instanceId='dropdown'
      options={automationOptions}
      value={parameterToAutomate}
      onChange={e => setParameterToAutomate(e)}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
    />
  );
}

const getAutomationOptions = node => {
  return [
    { label: 'volume', value: node.setVolume.bind(node), key: 'volumeAutomation' },
    { label: 'pan', value: node.setPan.bind(node), key: 'panAutomation' },
    { label: 'high pass filter frequency', value: node.setHPFilterFrequency.bind(node), key: 'hpFilterFrequencyAutomation' },
    { label: 'high pass filter Q', value: node.setHPFilterQ.bind(node), key: 'hpFilterQAutomation' },
    { label: 'low pass filter frequency', value: node.setLPFilterFrequency.bind(node), key: 'lpFilterFrequencyAutomation' },
    { label: 'low pass filter Q', value: node.setLPFilterFrequency.bind(node), key: 'lpFilterQAutomation' }
  ];
};
