import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PianoRollDesigner from './PianoRollDesigner';
import OscillatorSettings from './OscillatorSettings';
import LabStyles from './LabStyles';
import ElementSelector from './ElementSelector';
import WaveformSelector from './WaveformSelector';
import EnvelopeSettings from './EnvelopeSettings';
import FilterSettings from './FilterSettings';
import CopyNodeModal from '../modals/CopyNodeModal';
import { configActions, networkActions } from '../../redux/actions';
import useForceUpdate from '../../utils/useForceUpdate';
import useOutsideAlerter from '../../utils/useOutsideAlerter';

const Lab = () => {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const { menuVisible, labVisible, screenInfo } = useSelector(state => state.view);
  const theme = useSelector(state => state.network.theme);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ right: 0, top: 0 });
  const buttonRef = useRef();
  const dropdownRef = React.createRef();
  const dispatch = useDispatch();

  const forceUpdate = useForceUpdate('automation');

  const _hideDropdown = () => {
    setShowDropdown(false);
  };

  useOutsideAlerter(dropdownRef, _hideDropdown, showDropdown);

  useEffect(() => {
    if (!node) {
      dispatch(networkActions.createNodeForElement(elementIndex));
      dispatch(networkActions.createNodeForElement(elementIndex + 1));
    }
  }, [dispatch, elementIndex, node]);

  useEffect(() => {
    buttonRef.current &&
      setDropdownPosition({
        right: window.innerWidth - buttonRef.current.getBoundingClientRect().right,
        top: buttonRef.current.getBoundingClientRect().bottom
      });
  }, [buttonRef]);

  const classes = LabStyles({
    theme: theme,
    labVisible: labVisible,
    screenInfo: screenInfo,
    menuVisible: menuVisible,
    dropdownRight: dropdownPosition.right + 40,
    dropdownTop: dropdownPosition.top
  });

  const _onClickCopy = () => {
    dispatch(configActions.setModal(CopyNodeModal));
    dispatch(networkActions.setModalVisible(true));
  };

  const ElementOptionDropdown = () => {
    return (
      <div className={classes.elementOptionDropdown} ref={dropdownRef}>
        <button className={classes.optionButton} onClick={_onClickCopy}>
          copy from...
        </button>
      </div>
    );
  };

  return (
    <div className={screenInfo.isMobile ? classes.labMobile : classes.lab} id='lab'>
      <>
        <ElementSelector buttonRef={buttonRef} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
        <PianoRollDesigner forceUpdate={forceUpdate} />
        <OscillatorSettings />
        <WaveformSelector />
        <EnvelopeSettings />
        <FilterSettings forceUpdate={forceUpdate} />
        {showDropdown && <ElementOptionDropdown />}
      </>
    </div>
  );
};

export default Lab;
