import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import { sideMenuData, modalContent } from '../../../config';
import elements from '../../../constants/elements';
import Select from 'react-dropdown-select';
import { makeStyles } from '@material-ui/styles';

const classNameMap = {
  'add node': false,
  'edit edge': false,
  'select all': false,
  'delete selected': false,
  'add edges': false,
  pointer: false,
  multiselect: false,
  organize: false,
  fit: false
};

const SideMenuCategoryContainer = ({ category, show }) => {
  const { defaultState, addEdgeState, multiSelectState, organizeState, elementIndex, theme } = useSelector(
    state => state.network
  );
  const [classNames, setClassNames] = useState(classNameMap);

  const useStyles = makeStyles({
    categoryContainer: {
      opacity: '1.0',
      visibility: 'visible',
      transition: 'opacity 0.5s'
    },
    hide: {
      height: '0px !important',
      opacity: '0.0 !important',
      visibility: 'hidden !important',
      transition: 'opacity 0.5s'
    },
    networkButton: {
      fontFamily: 'inconsolata',
      display: 'block',
      border: 'none',
      flexGrow: '1',
      height: '30px',
      margin: '5px 5px 5px 10px',
      fontSize: '20px',
      fontWeight: '500',
      textAlign: 'left',
      cursor: 'pointer',
      outline: 'none',
      backgroundColor: theme.background,
      color: theme.text,
      whiteSpace: 'nowrap',
      '&:hover': {
        opacity: '0.4'
      }
    },
    selected: {
      fontWeight: '800'
    },
    rowContainer: {
      width: '80%',
      display: 'flex',
      alignItems: 'center'
    },
    dropdown: {
      width: '50px !important',
      maxWidth: '50px',
      height: '18px !important',
      minHeight: '18px !important',
      fontFamily: 'Inconsolata',
      fontWeight: '800',
      zIndex: '3',
      borderWidth: '0px 0px 2px 0px !important',
      borderColor: `${theme.text} $important`,
      outline: 'none !important',
      boxShadow: 'none !important',
      padding: '0px !important',
      '&:hover': {
        borderColor: `${theme.text} !important`,
        outline: 'none'
      },
      '& div': {
        '& input': {
          color: theme.text
        }
      }
    }
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const el = elements(theme).slice();
  if (el[0].atomicNumber === 0) {
    el.shift();
  }

  useEffect(() => {
    const bool = prop => {
      return prop ? true : false;
    };
    setClassNames({
      ...classNames,
      pointer: bool(defaultState),
      'add edges': bool(addEdgeState),
      multiselect: bool(multiSelectState),
      organize: bool(organizeState)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState, addEdgeState, multiSelectState, organizeState]);

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
    }
  };

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].atomicNumber));
  };

  return (
    <div className={`${show ? null : classes.hide} ${classes.categoryContainer}`}>
      {sideMenuData[category].map((action, j) => {
        return (
          <div className={classes.rowContainer} key={j}>
            <button
              className={`${classes.networkButton} ${classNames[action.label] && classes.selected}`}
              onClick={() => onClick(action)}
            >
              {action.label}
            </button>
            {action.label === 'add node' && (
              <Select
                options={el}
                onChange={onDropdownChange}
                className={classes.dropdown}
                values={[el[elementIndex - 1]]}
                dropdownGap={0}
                dropdownHandle={false}
                labelField='dropdownLabel'
                handleKeyDownFn={null}
                onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
                onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideMenuCategoryContainer;
