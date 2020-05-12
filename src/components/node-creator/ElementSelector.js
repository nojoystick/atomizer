import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import IconSet from '../../constants/icon-set';
import ElementTile from '../ElementTile';
import { useSelector, useDispatch } from 'react-redux';
import useNodeSettingsStyles from './NodeSettingsStyles';
import Select from 'react-select';
import { configActions, networkActions } from '../../redux/actions';
import elements from '../../constants/elements';
import { parseToRgba } from '../../utils/color-utils';

const ElementSelector = ({ buttonRef, showDropdown, setShowDropdown }) => {
  const theme = useSelector(state => state.network.theme);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const nodeData = useSelector(state => state.network.audio.nodeData);
  const [elementList, setElementList] = useState(elements(theme));
  const [element, setElement] = useState(elementList[elementIndex - 1]);
  const [canCopy, setCanCopy] = useState(false);

  useEffect(() => {
    setElementList(elements(theme));
  }, [theme]);

  useEffect(() => {
    setElement(elementList[elementIndex - 1]);
  }, [elementIndex, elementList]);

  useEffect(() => {
    let _canCopy = false;
    nodeData &&
      Object.values(nodeData).forEach(node => {
        if (node.notes) {
          _canCopy = true;
        }
      });
    setCanCopy(_canCopy);
  }, [nodeData, elementIndex]);

  const dispatch = useDispatch();
  const classes = useNodeSettingsStyles({ theme: theme });

  const updateIndex = (val, ind) => {
    dispatch(networkActions.setElementIndex(parseInt(val) + parseInt(ind)));
  };

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item.atomicNumber));
  };

  if (!element) {
    return <div className='elementTile' />;
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: '8px 3px',
      backgroundColor: state.isFocused && `${parseToRgba(element.color, 0.3)} !important`
    }),
    menuPortal: styles => ({ ...styles, zIndex: 10000 }),
    indicatorSeparator: styles => ({ display: 'none' })
  };

  return (
    <div id='nodeDetailPanel' className={classes.nodeDetailPanel}>
      <div className={classes.nodeToolbar}>
        <button className={classes.scrollButton} onClick={() => updateIndex(-1, elementIndex)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(270deg)` }}
            fill={theme && theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
        <ElementTile element={element} />
        <button className={classes.scrollButton} onClick={() => updateIndex(1, elementIndex)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(90deg)` }}
            fill={theme && theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
      </div>
      <div className={classes.row}>
        <Select
          className={classes.elementDropdown}
          classNamePrefix={classes.elementDropdown}
          menuPortalTarget={document.body}
          styles={customStyles}
          isMulti={false}
          components={{ DropdownIndicator: () => null }}
          options={elementList}
          value={element}
          onChange={onDropdownChange}
          getOptionLabel={option => option.dropdownLabel}
          onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
          onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
          maxMenuHeight={150}
        />
        <button
          ref={buttonRef}
          className={classes.ellipsis}
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ visibility: canCopy ? 'visible' : 'hidden' }}
        >
          ...
        </button>
      </div>
    </div>
  );
};

export default ElementSelector;
