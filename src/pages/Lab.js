import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PianoRollDesigner from '../components/node-creator/PianoRollDesigner';
import OscillatorSettings from '../components/node-creator/OscillatorSettings';
import NodeCreatorModalStyles from '../components/node-creator/NodeCreatorModalStyles';
import ElementSelector from '../components/node-creator/ElementSelector';
import PlayerEditor from '../components/node-creator/PlayerEditor';
import elements from '../constants/elements';
import Node from '../audio/Node';
import { useElementIndexHotkeys } from '../utils/hotkeys';

const Lab = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const [elToEdit, setElToEdit] = useState(elements(theme)[elementIndex - 1]);
  const [pianoRoll, setPianoRoll] = useState(null);
  const [node, setNode] = useState(new Node());
  const [mode, setMode] = useState(node.mode);
  const [show, setShow] = useState(false);

  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });
  useElementIndexHotkeys('Lab');

  useEffect(() => {
    setShow(true);
    return function cleanup() {
      setShow(false);
    };
  }, []);

  useEffect(() => {
    setElToEdit(elements(theme)[elementIndex - 1]);
  }, [elementIndex, theme]);

  return (
    <div className={`${classes.flexContainer} ${show ? 'page show' : 'page hide'}`}>
      <div className={classes.columnParent}>
        <ElementSelector element={elToEdit} node={node} />
        <PlayerEditor node={node} mode={mode} setMode={setMode} />
      </div>
      <PianoRollDesigner
        element={elToEdit}
        pianoRoll={pianoRoll}
        setPianoRoll={setPianoRoll}
        node={node}
        setNode={setNode}
        mode={mode}
      />
      <OscillatorSettings node={node} />
    </div>
  );
};

export default Lab;
