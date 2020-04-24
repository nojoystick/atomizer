import React, { useEffect, useState } from 'react';
import ElementTile from '../../ElementTile';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { useSelector, useDispatch } from 'react-redux';
import { useNodeDetailHotkeys } from '../../../utils/hotkeys';
import NodeDetailStyles from './NodeDetailStyles';
import ModeSelector from '../../ModeSelector';
import NodeDetailData from './node-detail-data';
import InputSlider from '../../InputSlider';
import MuteSoloButtons from '../../menus/player/MuteSoloButtons';
import Select from 'react-dropdown-select';
import { configActions } from '../../../redux/actions';
import useForceUpdate from '../../../utils/useForceUpdate';

const octaves = [
  { id: 0, dropdownLabel: '0', value: 0 },
  { id: 1, dropdownLabel: '1', value: 1 },
  { id: 2, dropdownLabel: '2', value: 2 },
  { id: 3, dropdownLabel: '3', value: 3 },
  { id: 4, dropdownLabel: '4', value: 4 },
  { id: 5, dropdownLabel: '5', value: 5 },
  { id: 6, dropdownLabel: '6', value: 6 }
];

const NodeDetailPanel = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const network = useSelector(state => state.network.network);
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const [nodeData, setNodeData] = useState(null);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  const theme = useSelector(state => state.network.theme);
  const useStylesProps = {
    theme: theme,
    menuVisible: menuVisible,
    sideMenuVisible: sideMenuVisible,
    nodeDetailVisible: nodeDetailVisible,
    screenInfo: screenInfo
  };

  const classes = NodeDetailStyles(useStylesProps);

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

  return (
    <div id='nodeDetailPanel' className={classes.nodeDetailPanel}>
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

      {nodeData ? (
        <>
          <div className={classes.msButtonBar}>
            <MuteSoloButtons
              mute={nodeData.options.audioNode.mute}
              onMute={nodeData.options.audioNode.toggleMute.bind(nodeData.options.audioNode)}
              solo={nodeData.options.audioNode.solo}
              onSolo={nodeData.options.audioNode.toggleSolo.bind(nodeData.options.audioNode)}
              updateParent={forceUpdate}
            />
          </div>
          {NodeDetailData(nodeData.options.audioNode).map(inputSlider => {
            return (
              <InputSlider key={inputSlider.key} useStyles={NodeDetailStyles} useStylesProps={useStylesProps} {...inputSlider} />
            );
          })}
          <div className={classes.row}>
            <Select
              options={octaves}
              onChange={e => nodeData.options.audioNode.setOctave(e[0].value)}
              className={classes.dropdown}
              values={[octaves[4]]}
              dropdownGap={0}
              dropdownHandle={false}
              labelField='dropdownLabel'
              onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
              onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
            />
            <ModeSelector
              key={nodeData.options.audioNode.mode}
              mode={nodeData.options.audioNode.mode}
              audioNode={nodeData.options.audioNode}
              updateParent={forceUpdate}
            />
          </div>
        </>
      ) : (
        <div className={`${classes.placeholder} ${nodeData ? null : classes.show}`}>
          <p className={classes.placeholderText}>no nodes selected</p>
        </div>
      )}
    </div>
  );
};

export default NodeDetailPanel;
