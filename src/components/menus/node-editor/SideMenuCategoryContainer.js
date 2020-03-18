import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import { sideMenuData, modalContent } from '../../../config';

const defaultCategoryClassName = 'categoryContainer';
const hideCategoryClassName = 'categoryContainer hide';
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

const SideMenuCategoryContainer = ({ category, show }) => {
  const { defaultState, addEdgeState, multiSelectState, organizeState } = useSelector(state => state.network);
  const [classNames, setClassNames] = useState(classNameMap);

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

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
    }
  };

  return (
    <div className={show ? defaultCategoryClassName : hideCategoryClassName}>
      {sideMenuData[category].map((action, j) => {
        return (
          <button className={classNames[action.label]} key={j} onClick={() => onClick(action)}>
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenuCategoryContainer;
