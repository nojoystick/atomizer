import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import IconSet from '../../constants/icon-set';
import Icon from '../Icon';

const RhythmSelector = ({ note, setNote }) => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({ theme: theme });
  const icons = [
    { name: 'sixteenth', path: IconSet.sixteenthNote, viewBox: '0 0 300 300', offsetTop: '-4px', offsetRight: '6px' },
    { name: 'eighth', path: IconSet.eighthNote, viewBox: '0 0 300 300', offsetTop: '1.5px', offsetRight: '0px' },
    { name: 'quarter', path: IconSet.quarterNote, viewBox: '0 0 300 300', offsetTop: '1px', offsetRight: '0px' },
    { name: 'half', path: IconSet.halfNote, viewBox: '0 0 300 300', offsetTop: '1px', offsetRight: '4px' },
    { name: 'whole', path: IconSet.wholeNote, viewBox: '0 0 350 350', offsetTop: '11.5px', offsetRight: '0px' }
  ];

  return (
    <div className={classes.parent}>
      {icons.map((icon, index) => {
        return (
          <button
            key={index}
            className={`${classes.button} ${icon.name === note && classes.selected}`}
            style={{ marginRight: icon.offsetRight }}
            onClick={() => setNote(icon.name)}
          >
            <Icon
              className={classes.icon}
              style={{ marginTop: icon.offsetTop }}
              viewBox={icon.viewBox}
              path={icon.path}
              fill={theme && theme.text}
            />
          </button>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles({
  parent: {
    margin: '0px',
    display: 'flex'
  },
  button: {
    width: '20px',
    height: '30px',
    fontFamily: 'Inconsolata',
    fontSize: '20px',
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text,
    border: 'none',
    opacity: '0.6',
    margin: '0px',
    padding: '0px',
    display: 'inline-block',
    position: 'relative',
    '&:hover': {
      opacity: '1.0'
    }
  },
  icon: {
    width: '20px',
    height: '30px'
  },
  selected: {
    marginTop: '-2px',
    opacity: '1.0',
    transform: 'scale(1.2, 1.2)',
    fontWeight: '1000',
    transition: '0.25s'
  }
});

export default RhythmSelector;
