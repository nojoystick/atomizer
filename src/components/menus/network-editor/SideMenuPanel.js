import React from 'react';
import Select from 'react-dropdown-select';
import { sizeConstants, useSideMenuData, modalContent } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import Icon from '../../Icon';
import { makeStyles } from '@material-ui/styles';
import elements from '../../../constants/elements';
import ElementTile from '../../ElementTile'
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible, screenInfo } = useSelector(state => state.view);
  const { elementIndex, theme } = useSelector(state => state.network);

  const useStyles = makeStyles({
    sideMenuPanel: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      right: '-6px',
      width: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'}`,
      height: screenInfo.height - sizeConstants.HEADER_SIZE + 20 - (menuVisible ? sizeConstants.BOTTOM_MENU_SIZE : 0),
      borderLeft: `3px solid ${theme.text}`,
      borderTop: `3px solid ${theme.text}`,
      margin: '0px',
      transition: 'width 0.5s, height 0.5s',
      backgroundColor: theme.background,
      zIndex: 1,
      overflowY: 'scroll'
    },
    editorHeader: {
      padding: '5px',
      whiteSpace: 'nowrap'
    },
    icon: {
      width: '40px',
      height: '40px',
    },
    button: {
      display: 'block',
      border: 'none',
      height: '60px',
      width: '65px',
      cursor: 'pointer',
      outline: 'none',
      backgroundColor: theme.background,
      color: theme.text,
      margin: 'auto',
      fontSize: '12px',
      '&:hover': {
        opacity: '0.4'
      }
    },
    selected: {
      fontWeight: '800'
    },
    dropdown: {
      width: '50px !important',
      maxWidth: '60px',
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
      margin: 'auto',
      marginTop: '10px',
      marginBottom: '10px',
      '&:hover': {
        borderColor: `${theme.text} !important`,
        outline: 'none'
      },
      '& div': {
        '& input': {
          color: theme.text
        }
      }
    },
    separator: {
      width: '60px',
      height: '2px',
      margin: 'auto',
      marginTop: '5px',
      marginBottom: '5px',
      backgroundColor: theme.text
    },
    tooltip: {
      backgroundColor: theme.name === 'dark' ? 'white' : 'black',
      color: theme.background,
      padding: '10px',
      fontSize: '14px'
    }
  });

  const classes = useStyles();
  const sideMenuData = useSideMenuData();
  const dispatch = useDispatch();

  const el = elements(theme).slice();
  if (el[0].atomicNumber === 0) {
    el.shift();
  }

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].atomicNumber));
  };

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
    }
  };


  return (
    <div id='sideMenuPanel' className={classes.sideMenuPanel}>
      <div className={classes.networkButtons}>
      <ElementTile nodeData={el[elementIndex-1]} style={{fontSize: '14px', width: sizeConstants.SIDE_MENU_SIZE-17, height: sizeConstants.SIDE_MENU_SIZE-17, margin: '5px'}}/>
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
        {Object.values(sideMenuData).map((actions, i) => {
          return (
            <>
              {actions.map((action, j) => {
                return(
                  <Tippy 
                    theme={theme.name === 'dark' ? 'light' : null} 
                    key={j} placement="left" 
                    arrow={true} 
                    animation='scale'
                    delay={0} 
                    duration={200} 
                    content={<p className={classes.tooltip}>{action.label}</p>}
                  >
                    <button className={classes.button} onClick={() => onClick(action)}>
                      <Icon className={classes.icon} path={action.icon.path} viewBox={action.icon.viewBox} fill={action.active ? theme.secondary : theme.text}/>
                    </button>
                </Tippy>
                )
              })}
              <div className={classes.separator} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuPanel;
