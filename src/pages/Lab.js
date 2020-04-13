import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PianoRollDesigner from '../components/node-creator/PianoRollDesigner';
import OscillatorSettings from '../components/node-creator/OscillatorSettings';
import NodeCreatorModalStyles from '../components/node-creator/NodeCreatorModalStyles';
import ElementSelector from '../components/node-creator/ElementSelector';
import PlayerEditor from '../components/node-creator/PlayerEditor';
import elements from '../constants/elements';
import Node from '../audio/Node';

const Lab = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const [elToEdit, setElToEdit] = useState(elements(theme)[elementIndex - 1]);
  const [pianoRoll, setPianoRoll] = useState(null);
  const [node] = useState(new Node());
  const [show, setShow] = useState(false);

  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });

  useEffect(() => {
    setShow(true);
    return function cleanup() {
      setShow(false);
    };
  }, []);

  useEffect(() => {
    node.setNotes(pianoRoll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pianoRoll]);

  useEffect(() => {
    setElToEdit(elements(theme)[elementIndex - 1]);
  }, [elementIndex, theme]);

  return (
    <div className={`${classes.flexContainer} ${show ? 'page show' : 'page hide'}`}>
      <div className={classes.columnParent}>
        <ElementSelector element={elToEdit} node={node} />
        <PlayerEditor node={node} />
      </div>
      <PianoRollDesigner element={elToEdit} pianoRoll={pianoRoll} setPianoRoll={setPianoRoll} />
      <OscillatorSettings node={node} />
    </div>
  );
};

export default Lab;
