import React, { useState } from 'react';
import Icon from '../Icon';
import IconSet from '../../constants/icon-set';
import ElementTile from '../ElementTile';
import { useSelector, useDispatch } from 'react-redux';
import NodeSettingsStyles from './NodeSettingsStyles';
import Select from 'react-dropdown-select';
import { configActions, networkActions } from '../../redux/actions';
import elements from '../../constants/elements';

const ElementSelector = ({ element }) => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const [nodeData] = useState(null);
  const dispatch = useDispatch();

  const theme = useSelector(state => state.network.theme);
  const classes = NodeSettingsStyles({ theme: theme });

  const updateIndex = (val, ind) => {
    dispatch(networkActions.setElementIndex(parseInt(val) + parseInt(ind)));
  };

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].atomicNumber));
  };

  return (
    <div id='nodeDetailPanel' className={classes.nodeDetailPanel}>
      <div className={`${classes.nodeToolbar} ${nodeData ? classes.show : null}`}>
        <button className={classes.scrollButton} onClick={() => updateIndex(-1, elementIndex)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(270deg)` }}
            fill={theme && theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
        <ElementTile nodeData={element} style={{ margin: '10px' }} />
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
      <Select
        portal={document.querySelector('body')}
        options={elements(theme)}
        onChange={onDropdownChange}
        className={classes.dropdown}
        values={[elements(theme)[elementIndex - 1]]}
        dropdownGap={0}
        dropdownHandle={false}
        labelField='dropdownLabel'
        onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
        onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
      />
    </div>
  );
};

export default ElementSelector;
