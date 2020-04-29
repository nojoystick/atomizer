import React from 'react';
import ModeSelector from '../ModeSelector';
import { useSelector } from 'react-redux';
import Select from 'react-dropdown-select';
import useForceUpdate from '../../utils/useForceUpdate';
import { makeStyles } from '@material-ui/styles';

const octaves = [
  { id: 0, dropdownLabel: '0', value: 0 },
  { id: 1, dropdownLabel: '1', value: 1 },
  { id: 2, dropdownLabel: '2', value: 2 },
  { id: 3, dropdownLabel: '3', value: 3 },
  { id: 4, dropdownLabel: '4', value: 4 },
  { id: 5, dropdownLabel: '5', value: 5 },
  { id: 6, dropdownLabel: '6', value: 6 }
];

const useStyles = makeStyles({
  parent: {
    margin: '15px',
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: props => props.theme && `3px solid ${props.theme.text}`,
    backgroundColor: props => props.theme && props.theme.background,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  dropdown: {
    width: '50px',
    maxWidth: '60px',
    height: '18px !important',
    minHeight: '18px !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    zIndex: '3',
    borderWidth: '0px 0px 2px 0px !important',
    borderColor: `${props => props.theme && props.theme.text} $important`,
    boxShadow: 'none !important',
    padding: '0px !important',
    display: 'inline',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`
    },
    '> & span': {
      width: '23px'
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  }
});

const PlayerEditor = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({ theme: theme });
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData[elementIndex]);
  const forceUpdateMode = useForceUpdate('mode');
  useForceUpdate('octave');

  return (
    <>
      <div className={classes.parent} style={{ paddingTop: '5px' }}>
        {node && (
          <>
            <Select
              key={elementIndex}
              options={octaves}
              onChange={e => node.setOctave(e[0].value)}
              className={classes.dropdown}
              values={[{ dropdownLabel: node.octave, value: node.octave }]}
              dropdownGap={0}
              dropdownHandle={false}
              labelField='dropdownLabel'
            />
            <ModeSelector mode={node.mode} audioNode={node} updateParent={forceUpdateMode} />
          </>
        )}
      </div>
    </>
  );
};

export default PlayerEditor;
