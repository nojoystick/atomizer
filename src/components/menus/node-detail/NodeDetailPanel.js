import React, { useEffect, useState } from 'react';
import ElementTile from '../../ElementTile';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { useSelector } from 'react-redux';
import { useNodeDetailHotkeys } from '../../../utils/hotkeys';
import NodeDetailStyles from './NodeDetailStyles';

const NodeDetailPanel = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const network = useSelector(state => state.network.network);
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const [nodeData, setNodeData] = useState(null);
  const [index, setIndex] = useState(0);

  const theme = useSelector(state => state.network.theme);

  const classes = NodeDetailStyles({
    theme: theme,
    menuVisible: menuVisible,
    sideMenuVisible: sideMenuVisible,
    nodeDetailVisible: nodeDetailVisible,
    screenInfo: screenInfo
  });

  useEffect(() => {
    if (selectedNodes && selectedNodes[0]) {
      if (index > selectedNodes.length - 1) {
        let i = index;
        while (i > selectedNodes.length - 1) {
          i--;
        }
        setIndex(i);
      }
      setNodeData(Object.values(network.body.nodes).find(el => el.id === selectedNodes[index]));
    } else {
      setNodeData(null);
    }
  }, [index, network, nodeData, selectedNodes]);

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
    return {};
  };

  return (
    <div id='nodeDetailPanel' className={classes.nodeDetailPanel} style={menuStyle()}>
      <h2 className={classes.nodeHeader}>node editor</h2>
      <div className={`${classes.nodeToolbar} ${nodeData ? classes.show : null}`}>
        <button className={classes.scrollButton} onClick={() => updateIndex(-1, index)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(270deg)` }}
            fill={theme && theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
        <ElementTile nodeData={nodeData && nodeData.options} />
        <button className={classes.scrollButton} onClick={() => updateIndex(1, index)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(90deg)` }}
            fill={theme && theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
      </div>

      <div className={`${classes.placeholder} ${nodeData ? null : classes.show}`}>
        <p className={classes.placeholderText}>no nodes selected</p>
      </div>
    </div>
  );
};

export default NodeDetailPanel;
