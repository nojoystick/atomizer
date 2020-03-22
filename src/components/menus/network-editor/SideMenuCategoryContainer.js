import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import { useSideMenuData, modalContent } from '../../../config';
import elements from '../../../constants/elements';
import Select from 'react-dropdown-select';
import { makeStyles } from '@material-ui/styles';

const SideMenuCategoryContainer = ({ category, show }) => {
  const { elementIndex, theme } = useSelector(state => state.network);

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
  const sideMenuData = useSideMenuData();
  const el = elements(theme).slice();
  if (el[0].atomicNumber === 0) {
    el.shift();
  }

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
            <button className={`${classes.networkButton} ${action.active && classes.selected}`} onClick={() => onClick(action)}>
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
