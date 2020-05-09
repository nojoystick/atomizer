import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PianoRollDesigner from './PianoRollDesigner';
import OscillatorSettings from './OscillatorSettings';
import LabStyles from './LabStyles';
import ElementSelector from './ElementSelector';
import WaveformSelector from './WaveformSelector';
import EnvelopeSettings from './EnvelopeSettings';
import FilterSettings from './FilterSettings';
import { networkActions } from '../../redux/actions';
import useForceUpdate from '../../utils/useForceUpdate';

const Lab = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const { menuVisible, labVisible, screenInfo } = useSelector(state => state.view);
  const theme = useSelector(state => state.network.theme);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const dispatch = useDispatch();

  const forceUpdate = useForceUpdate('automation');

  useEffect(() => {
    if (!node) {
      dispatch(networkActions.createNodeForElement(elementIndex));
      dispatch(networkActions.createNodeForElement(elementIndex + 1));
    }
  }, [dispatch, elementIndex, node]);

  const classes = LabStyles({
    theme: theme,
    labVisible: labVisible,
    screenInfo: screenInfo,
    menuVisible: menuVisible
  });

  return (
    <div className={screenInfo.isMobile ? classes.labMobile : classes.lab} id='lab'>
      <>
        <ElementSelector />
        <PianoRollDesigner forceUpdate={forceUpdate} />
        <OscillatorSettings />
        <WaveformSelector />
        <EnvelopeSettings />
        <FilterSettings forceUpdate={forceUpdate} />
      </>
    </div>
  );
};

export default Lab;
