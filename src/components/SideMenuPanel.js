import React, { useState, useEffect } from 'react';
import '../stylesheets/SideMenuPanel.scss';
import { networkStateConstants } from '../constants/network-constants';
import { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE } from '../config/panel-size-constants';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, configActions } from '../redux/actions';
import { modalContent } from '../config/modal-content';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import ColorVariables from '../stylesheets/Colors.scss';

const iconColor = ColorVariables.text;
const defaultClassName = 'networkButton';
const selectedClassName = 'networkButton selected';
const classNameMap = {
  'add node': defaultClassName,
  'edit edge': defaultClassName,
  'select all': defaultClassName,
  'delete selected': defaultClassName,
  'add edges': defaultClassName,
  pointer: selectedClassName,
  multiselect: defaultClassName,
  organize: defaultClassName,
  fit: defaultClassName
};
const defaultCategoryClassName = 'categoryContainer';
const hideCategoryClassName = 'categoryContainer hide';
const categoryClassNameMap = {
  INTERACT: defaultCategoryClassName,
  MODE: defaultCategoryClassName,
  VIEW: defaultCategoryClassName
};

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible } = useSelector(state => state.view);
  const { defaultState, addEdgeState, multiSelectState, organizeState } = useSelector(state => state.network);
  const [classNames, setClassNames] = useState(classNameMap);
  const [categoryClassNames, setCategoryClassNames] = useState(categoryClassNameMap);
  const dispatch = useDispatch();

  useEffect(() => {
    const bool = prop => {
      return prop ? selectedClassName : defaultClassName;
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

  const menuStyle = {
    width: `${sideMenuVisible ? SIDE_MENU_SIZE + 'px' : '0px'}`,
    height: window.innerHeight - 40 - (menuVisible ? BOTTOM_MENU_SIZE : 0)
  };

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
    }
  };

  const toggleCategoryClassName = key => {
    setCategoryClassNames({
      ...categoryClassNames,
      [key]: categoryClassNames[key] === defaultCategoryClassName ? hideCategoryClassName : defaultCategoryClassName
    });
  };

  return (
    <div id='sideMenuPanel' className='sideMenuPanel' style={menuStyle}>
      <h2 className='editorHeader'>network editor</h2>
      <div className='networkButtons floatRight'>
        {Object.keys(networkStateConstants).map((key, i) => {
          return (
            <div key={i}>
              <button className='categoryHeader' onClick={() => toggleCategoryClassName(key)}>
                <h3>{key}</h3>
                <Icon
                  className='showHideIcon'
                  style={{
                    transform: `rotate(${categoryClassNames[key] === defaultCategoryClassName ? '180deg' : '0deg'})`,
                    marginRight: `${sideMenuVisible ? '20px' : '-40px'}`
                  }}
                  fill={iconColor}
                  viewBox='3 5 10 5'
                  path={IconSet.expandArrow}
                />
              </button>
              <div className={categoryClassNames[key]}>
                {networkStateConstants[key].map((action, j) => {
                  return (
                    <button className={classNames[action.label]} key={j} onClick={() => onClick(action)}>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuPanel;
