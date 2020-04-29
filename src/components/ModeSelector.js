import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const ModeSelector = ({ mode, audioNode, updateParent }) => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({ theme: theme });
  const disposition = useSelector(state => state.network.audio.disposition);
  const labels = {
    M: [
      { label: 'I', value: 'I' },
      { label: 'ii', value: 'ii' },
      { label: 'iii', value: 'iii' },
      { label: 'IV', value: 'IV' },
      { label: 'V', value: 'V' },
      { label: 'vi', value: 'vi' },
      { label: 'vii', value: 'vii' }
    ],
    m: [
      { label: 'i', value: 'vi' },
      { label: 'ii', value: 'vii' },
      { label: 'III', value: 'I' },
      { label: 'iv', value: 'ii' },
      { label: 'v', value: 'iii' },
      { label: 'VI', value: 'IV' },
      { label: 'VII', value: 'V' }
    ]
  };

  const onClick = e => {
    audioNode.setMode(e.target.value);
    updateParent && updateParent();
  };

  const labelsToMap = labels[disposition] ? labels[disposition] : labels['M'];

  return (
    <div className={classes.parent}>
      {labelsToMap.map(label => {
        return (
          <button
            key={label.label}
            className={`${classes.button} ${(label.value === mode || label.value === audioNode.mode) && classes.selected}`}
            onClick={onClick}
            value={label.value}
          >
            {label.label}
          </button>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles({
  parent: {
    padding: '10px',
    margin: '0px',
    display: 'inline-block'
  },
  button: {
    fontFamily: 'Inconsolata',
    fontSize: '20px',
    fontWeight: '600',
    display: 'inline',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    border: 'none',
    opacity: '0.6',
    marginTop: '10px',
    '&:hover': {
      opacity: '1.0'
    }
  },
  selected: {
    marginTop: '0px',
    opacity: '1.0',
    transform: 'scale(1.2, 1.2)',
    fontWeight: '1000',
    transition: '0.25s'
  }
});

export default ModeSelector;
