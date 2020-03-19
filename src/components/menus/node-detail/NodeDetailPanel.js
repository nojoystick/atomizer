import React, { useEffect, useState } from 'react';
import '../../../stylesheets/NodeDetailPanel.scss';
import { sizeConstants } from '../../../config';
import elements from '../../../constants/elements';
import ElementTile from './ElementTile';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import ColorVariables from '../../../stylesheets/Colors.scss';
import { useSelector } from 'react-redux';
import { useNodeDetailHotkeys } from '../../../utils/hotkeys';

const iconColor = ColorVariables.text;

const NodeDetailPanel = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const [nodeData, setNodeData] = useState(null);
  const { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE, HEADER_SIZE } = sizeConstants;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (selectedNodes && selectedNodes[0]) {
      if (index > selectedNodes.length - 1) {
        let i = index;
        while (i > selectedNodes.length - 1) {
          i--;
        }
        setIndex(i);
      }
      setNodeData(elements.find(el => el.id === selectedNodes[index]));
    } else {
      setNodeData(null);
    }
  }, [index, nodeData, selectedNodes]);

  const updateIndex = (val, ind) => {
    if (selectedNodes) {
      let i = ind + val;
      if (i < 0) {
        i = selectedNodes.length - 1;
      } else if (i > selectedNodes.length - 1 && selectedNodes.length > 0) {
        i = 0;
      }
      setIndex(i);
    }
  };

  useNodeDetailHotkeys(index, updateIndex);

  const menuStyle = () => {
    return {
      height: `${
        nodeDetailVisible
          ? menuVisible
            ? screenInfo.height - BOTTOM_MENU_SIZE - HEADER_SIZE + 18 + 'px'
            : BOTTOM_MENU_SIZE + 'px'
          : '0px'
      }`,
      right: `${screenInfo.width < screenInfo.breakpoint ? '-3px' : sideMenuVisible ? SIDE_MENU_SIZE - 5 + 'px' : '0px'}`,
      bottom: `${menuVisible ? BOTTOM_MENU_SIZE - 13 + 'px' : '-10px'}`,
      borderBottom: `${nodeDetailVisible ? '3px solid black' : '0px solid black'}`,
      width: `${screenInfo.width < screenInfo.breakpoint ? '100%' : '350px'}`
    };
  };

  return (
    <div id='nodeDetailPanel' className='nodeDetailPanel' style={menuStyle()}>
      <h2 className='nodeHeader'>node editor</h2>
      <div className={`nodeToolbar ${nodeData ? 'show' : null}`}>
        <button className='scrollButton' onClick={() => updateIndex(-1, index)}>
          <Icon
            className={'scrollIcon'}
            style={{ transform: `rotate(270deg)` }}
            fill={iconColor}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
        <ElementTile nodeData={nodeData} />
        <button className='scrollButton' onClick={() => updateIndex(1, index)}>
          <Icon
            className={'scrollIcon right'}
            style={{ transform: `rotate(90deg)` }}
            fill={iconColor}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
      </div>

      <div className={`placeholder ${nodeData ? null : 'show'}`}>
        <p className='placeholderText'>no nodes selected</p>
      </div>
    </div>
  );
};

export default NodeDetailPanel;
