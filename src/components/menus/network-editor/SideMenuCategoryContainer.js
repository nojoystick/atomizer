import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import { sideMenuData, modalContent } from '../../../config';
import elements from '../../../constants/elements';
import Select from 'react-dropdown-select';

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
  const { defaultState, addEdgeState, multiSelectState, organizeState, elementIndex } = useSelector(state => state.network);
  const [classNames, setClassNames] = useState(classNameMap);
  const dispatch = useDispatch();
  const el = elements.slice();
  if (el[0].atomicNumber === 0) {
    el.shift();
  }

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

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].id));
  };

  return (
    <div className={show ? defaultCategoryClassName : hideCategoryClassName}>
      {sideMenuData[category].map((action, j) => {
        return (
          <div className='rowContainer' key={j}>
            <button className={classNames[action.label]} onClick={() => onClick(action)}>
              {action.label}
            </button>
            {action.label === 'add node' && (
              <Select
                options={el}
                onChange={onDropdownChange}
                className='dropdown'
                values={[el[elementIndex - 1]]}
                dropdownGap={0}
                dropdownHandle={false}
                labelField='dropdownLabel'
                handleKeyDownFn={null}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideMenuCategoryContainer;
