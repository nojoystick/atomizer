import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import Select from 'react-select';
import { keyArrs, keyMap, dispositionOptions } from '../constants/frequencies';
import { makeStyles } from '@material-ui/styles';
import elements from '../constants/elements';
import { parseToRgba } from '../utils/color-utils';

const useStyles = makeStyles({
  parent: {
    padding: '0px',
    width: '100px',
    display: 'flex'
  },
  dropdown: {
    backgroundColor: 'inherit !important',
    color: 'inherit !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    border: 'none !important',
    width: '50px',
    '& div': {
      boxShadow: 'none'
    },
    '&__menu': {
      minWidth: '35px',
      boxShadow: props => props.theme && `${props.theme.boxShadow} !important`
    },
    '&__menu-list': {
      zIndex: '8001 !important',
      backgroundColor: props => props.theme && `${props.theme.secondaryBackgroundSolid} !important`
    },
    '&__option': {
      padding: '5px 0px !important',
      color: props => props.theme && `${props.theme.text} !important`
    }
  },
  key: {
    width: '30px'
  }
});

const KeyDropdowns = () => {
  const { key, disposition } = useSelector(state => state.network.audio);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const theme = useSelector(state => state.network.theme);
  const [elementList] = useState(elements(theme));
  const [element, setElement] = useState(elementList[elementIndex - 1]);

  const dispatch = useDispatch();
  const classes = useStyles({ theme: theme });

  useEffect(() => {
    setElement(elementList[elementIndex - 1]);
  }, [element, elementIndex, elementList]);

  const onKeyChange = e => {
    dispatch(networkActions.setKey(e));
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
    if (disposition) {
      const localDisposition = disposition;
      dispatch(networkActions.setDisposition(e.value));
      if (Object.keys(dispositionLabelChange).includes(key.label)) {
        const label = dispositionLabelChange[key.label];
        const newDisposition = dispositionLabelChange[localDisposition];
        dispatch(networkActions.setKey(keyMap[newDisposition][label]));
      }
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: '8px 3px',
      backgroundColor: state.isSelected
        ? `${element.color} !important`
        : state.isFocused
        ? `${parseToRgba(element.color, 0.3)} !important`
        : ''
    }),
    menuPortal: styles => ({ ...styles, zIndex: 10000 }),
    indicatorSeparator: styles => ({ display: 'none' })
  };

  return (
    <>
      {disposition && (
        <div className={classes.parent}>
          <Select
            className={`${classes.dropdown} ${classes.key}`}
            classNamePrefix={classes.dropdown}
            menuPortalTarget={document.body}
            components={{ DropdownIndicator: () => null }}
            styles={customStyles}
            options={keyArrs[disposition]}
            onChange={onKeyChange}
            value={[keyArrs[disposition].find(val => val.label === key.label)]}
            onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
            onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
            menuPlacement='auto'
            maxMenuHeight={150}
          />
          <Select
            className={classes.dropdown}
            classNamePrefix={classes.dropdown}
            menuPortalTarget={document.body}
            components={{ DropdownIndicator: () => null }}
            styles={customStyles}
            options={dispositionOptions}
            onChange={onDispositionChange}
            value={[dispositionOptions.find(val => val.value === disposition)]}
            disabled={key.value === 0}
            onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
            onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
            menuPlacement='auto'
          />
        </div>
      )}
    </>
  );
};

export default KeyDropdowns;
