import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PianoRollDesigner from '../components/node-creator/PianoRollDesigner';
import OscillatorSettings from '../components/node-creator/OscillatorSettings';
import NodeCreatorModalStyles from '../components/node-creator/NodeCreatorModalStyles';
import NodeSettings from '../components/node-creator/NodeSettings';
import elements from '../constants/elements';
import { useSubPanelData } from '../components/menus/main/bottom-menu-data';
import SubPanel from '../components/menus/main/SubPanel';
import { enableBodyScroll } from 'body-scroll-lock';

const Lab = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const [show, setShow] = useState(false);

  const subPanelData = useSubPanelData();

  const targetElement = document.querySelector('#root');
  enableBodyScroll(targetElement);

  useEffect(() => {
    setShow(true);
    return function cleanup() {
      setShow(false);
    };
  }, []);

  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });

  const elToEdit = elements(theme)[elementIndex - 1];

  return (
    <div className={`${classes.flexContainer} ${show ? 'page show' : 'page hide'}`}>
      <NodeSettings element={elToEdit} />
      <PianoRollDesigner element={elToEdit} />
      <OscillatorSettings />
      <div className={classes.effectsContainer}>
        {subPanelData.map((subPanel, index) => {
          return <SubPanel data={subPanel} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Lab;
