import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Select from 'react-dropdown-select';
import { keyArrs, keyMap, dispositionOptions } from '../constants/frequencies';
import { makeStyles } from '@material-ui/styles';

const KeyDropdowns = ({ style, renderInBody }) => {
  const { key, disposition } = useSelector(state => state.network.audio);
  const theme = useSelector(state => state.network.theme);

  const dispatch = useDispatch();
  const classes = useStyles({ theme: theme });

  const onKeyChange = e => {
    dispatch(networkActions.setKey(e[0]));
  };

  const dispositionLabelChange = {
    Db: 'C#',
    Gb: 'F#',
    Ab: 'G#',
    'C#': 'Db',
    'F#': 'Gb',
    'G#': 'Ab',
    m: 'M',
    M: 'm'
  };

  const onDispositionChange = e => {
    const localDisposition = disposition;
    dispatch(networkActions.setDisposition(e[0].value));
    if (Object.keys(dispositionLabelChange).includes(key.label)) {
      const label = dispositionLabelChange[key.label];
      const newDisposition = dispositionLabelChange[localDisposition];
      dispatch(networkActions.setKey(keyMap[newDisposition][label]));
    }
  };

  return (
    <div className={classes.parent} style={style}>
      <Select
        portal={renderInBody && document.querySelector('body')}
        options={keyArrs[disposition]}
        onChange={onKeyChange}
        className={`small-dropdown-no-search ${classes.dropdown}`}
        values={[keyArrs[disposition].find(val => val.label === key.label)]}
        searchable={false}
        dropdownGap={0}
        dropdownHandle={false}
        labelField='label'
        onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
        onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
      />
      <Select
        portal={renderInBody && document.querySelector('body')}
        options={dispositionOptions}
        onChange={onDispositionChange}
        className={`${classes.dropdown} wide-dropdown-no-search`}
        values={[dispositionOptions.find(val => val.value === disposition)]}
        searchable={false}
        disabled={key.value === 0}
        dropdownGap={0}
        dropdownHandle={false}
        labelField='label'
        onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
        onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
      />
    </div>
  );
};

const useStyles = makeStyles({
  parent: {
    width: '80px',
    display: 'flex'
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
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
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

export default KeyDropdowns;
