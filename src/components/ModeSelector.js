import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const ModeSelector = ({ mode, audioNode, setMode }) => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({ theme: theme });
  const labels = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'];

  const onClick = e => {
    audioNode ? audioNode.setMode(e.target.value) : setMode(e.target.value);
  };

  return (
    <div className={classes.parent}>
      {labels.map(label => {
        return (
          <button
            key={label}
            className={`${classes.button} ${label === mode && classes.selected}`}
            onClick={onClick}
            value={label}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles({
  parent: {
    padding: '10px',
    width: '70%',
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
    outline: 'none',
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
