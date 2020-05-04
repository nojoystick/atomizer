import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import IconSet from '../../constants/icon-set';
import { useSelector } from 'react-redux';
import Icon from '../Icon';
import useForceUpdate from '../../utils/useForceUpdate';

const useStyles = makeStyles({
  parent: {
    width: '100%',
    height: '50px',
    margin: '15px',
    display: 'flex',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => props.theme && `3px solid ${props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  button: {
    backgroundColor: 'transparent',
    flexGrow: '1',
    transition: 'background-color 0.5s, 0.5s'
  },
  selected: {
    backgroundColor: props => (props.theme && props.theme.name === 'dark' ? props.theme.secondary : 'rgba(100, 100, 100, 0.2)'),
    boxShadow: props => props.theme && props.theme.boxShadowLight
  },
  icon: {
    width: '80px',
    height: '40px'
  }
});

const icons = [
  {
    value: 'sine',
    icon: IconSet.sineWave,
    viewBox: '50 0 105 105',
    strokeWidth: '5'
  },
  {
    value: 'triangle',
    icon: IconSet.triangleWave,
    viewBox: '100 0 700 700',
    strokeWidth: '35'
  },
  {
    value: 'sawtooth',
    icon: IconSet.sawtoothWave,
    viewBox: '100 0 700 700',
    strokeWidth: '35'
  },
  {
    value: 'square',
    icon: IconSet.squareWave,
    viewBox: '100 0 700 700',
    strokeWidth: '35'
  }
];

export default function WaveformSelector() {
  const theme = useSelector(state => state.network.theme);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const [waveforms, setWaveforms] = useState(node && node.waveforms);
  const classes = useStyles({ theme: theme });
  const forceUpdate = useForceUpdate();

  const _handleClick = waveform => {
    let waveformsCopy = waveforms.slice();
    if (!waveformsCopy.includes(waveform)) {
      waveformsCopy.push(waveform);
    } else if (waveformsCopy.length > 1) {
      waveformsCopy = waveformsCopy.filter(wf => wf !== waveform);
    } else {
      return;
    }
    node.setWaveforms(waveformsCopy);
    setWaveforms(waveformsCopy);
    forceUpdate();
  };

  useEffect(() => {
    setWaveforms(node && node.waveforms);
  }, [node]);

  return (
    <div className={classes.parent}>
      {node &&
        icons.map((icon, index) => {
          return (
            <button
              key={index}
              className={`${classes.button} ${node.waveforms && node.waveforms.includes(icon.value) && classes.selected}`}
              onClick={() => _handleClick(icon.value)}
            >
              <Icon
                className={classes.icon}
                path={icon.icon}
                fill='none'
                strokeWidth={icon.strokeWidth}
                stroke={theme && theme.text}
                viewBox={icon.viewBox}
              />
            </button>
          );
        })}
    </div>
  );
}
