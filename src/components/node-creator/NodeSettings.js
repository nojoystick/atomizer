import React, { useState } from 'react';
import ElementTile from '../ElementTile';
import { useSelector, useDispatch } from 'react-redux';
import { useNodeDetailHotkeys } from '../../utils/hotkeys';
import NodeDetailStyles from './NodeSettingsStyles';
import ModeSelector from '../ModeSelector';
import NodeDetailData from '../menus/node-detail/node-detail-data';
import InputSlider from '../InputSlider';
import Select from 'react-dropdown-select';
import { configActions } from '../../redux/actions';

const octaves = [
  { id: 0, dropdownLabel: '0', value: 0 },
  { id: 1, dropdownLabel: '1', value: 1 },
  { id: 2, dropdownLabel: '2', value: 2 },
  { id: 3, dropdownLabel: '3', value: 3 },
  { id: 4, dropdownLabel: '4', value: 4 },
  { id: 5, dropdownLabel: '5', value: 5 },
  { id: 6, dropdownLabel: '6', value: 6 }
];

const NodeDetailPanel = ({ element }) => {
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const [nodeData, setNodeData] = useState(null);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const theme = useSelector(state => state.network.theme);
  const classes = NodeDetailStyles({ theme: theme });

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
      <ElementTile nodeData={element} />

      {nodeData ? (
        <>
          {NodeDetailData(nodeData.options.audioNode).map(inputSlider => {
            return <InputSlider key={inputSlider.key} useStyles={NodeDetailStyles} {...inputSlider} />;
          })}
          <div className={classes.row}>
            <ModeSelector
              key={nodeData.options.audioNode.mode}
              mode={nodeData.options.audioNode.mode}
              audioNode={nodeData.options.audioNode}
            />
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
