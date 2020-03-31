import React from 'react';
import Select from 'react-dropdown-select';
import { sizeConstants, useSideMenuData, modalContent } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import Icon from '../../Icon';
import elements from '../../../constants/elements';
import ElementTile from '../../ElementTile';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import SideMenuStyles from './SideMenuStyles';

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible, screenInfo } = useSelector(state => state.view);
  const { elementIndex, theme } = useSelector(state => state.network);

  const classes = SideMenuStyles({
    theme: theme,
    sideMenuVisible: sideMenuVisible,
    screenInfo: screenInfo,
    menuVisible: menuVisible
  });
  const sideMenuData = useSideMenuData();
  const dispatch = useDispatch();

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].atomicNumber));
  };

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
    }
  };

  const el = elements(theme);

  return (
    <div id='sideMenuPanel' className={classes.sideMenuPanel}>
      <ElementTile
        nodeData={el[elementIndex - 1]}
        style={{
          fontSize: '14px',
          width: sizeConstants.SIDE_MENU_SIZE - 17,
          height: sizeConstants.SIDE_MENU_SIZE - 17,
          margin: '5px'
        }}
      />
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
              return (
                <Tippy
                  theme={theme && theme.name === 'dark' ? 'light' : null}
                  key={j}
                  placement='left'
                  arrow={true}
                  animation='scale'
                  delay={0}
                  duration={200}
                  content={
                    <span className={classes.tooltip}>
                      <p className={classes.tooltipText}>{action.label}</p>
                      <p className={classes.shortcut}>{action.shortcut}</p>
                    </span>
                  }
                >
                  <button className={classes.button} onClick={() => onClick(action)}>
                    <Icon
                      className={classes.icon}
                      path={action.icon.path}
                      viewBox={action.icon.viewBox}
                      fill={theme ? (action.active ? theme.secondary : theme.text) : null}
                    />
                  </button>
                </Tippy>
              );
            })}
            <div className={classes.separator} />
          </>
        );
      })}
    </div>
  );
};

export default SideMenuPanel;
