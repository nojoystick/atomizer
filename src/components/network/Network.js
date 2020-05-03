/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import { useMultiSelectHotkeys } from '../../utils/hotkeys';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, viewActions } from '../../redux/actions';

const Network = () => {
  const { menuVisible, labVisible, screenInfo } = useSelector(state => state.view);
  const doFit = useSelector(state => state.network.fit);
  const network = useSelector(state => state.network.network);
  const options = useSelector(state => state.network.options);
  const graphInfo = useSelector(state => state.network.graphInfo);
  const multiSelectState = useSelector(state => state.network.multiSelectState);
  const [dragStart, setDragStart] = useState({ window: { x: 0, y: 0 } });
  const [cursorPosition, setCursorPosition] = useState(null);
  const [ctrl, setCtrl] = useState(false);
  const dispatch = useDispatch();

  useMultiSelectHotkeys(setCtrl);

  useEffect(() => {
    if (network) {
      if (!menuVisible && !labVisible) {
        network.moveTo(fit(0, 0, 1.0));
      } else if (screenInfo.isMobile) {
        network.moveTo(fit(0, screenInfo.height * 0.8, 0.3));
      } else if (menuVisible) {
        network.moveTo(fit(0, screenInfo.height * 0.8, 0.3));
      } else if (!menuVisible) {
        network.moveTo(fit(screenInfo.width * 0.3, 0, 0.3));
      }
    }
  }, [menuVisible, labVisible]);

  useEffect(() => {
    if (doFit) {
      network.moveTo(fit(0, 0, 1.0));
      dispatch(networkActions.fit(false));
    }
  }, [doFit]);

  const events = {
    doubleClick: function(event) {
      dispatch(event.nodes.length ? viewActions.setLabVisible(true) : networkActions.addNodeFromClick(event));
    },
    dragStart: function(event) {
      if (!event.nodes.length && multiSelectState) {
        document.addEventListener('mousemove', _onMouseMove);
        setDragStart({
          canvas: event.pointer.canvas,
          window: { x: event.event.srcEvent.x, y: event.event.srcEvent.y },
          ctrl: ctrl
        });
      }
    },
    dragEnd: function(event) {
      if (!event.nodes.length && multiSelectState && dragStart.canvas) {
        dispatch(networkActions.multiselect(dragStart, event));
        setDragStart(null);
        setCursorPosition(null);
      }
      document.removeEventListener('mousemove', _onMouseMove);
    },
    selectNode: function(event) {
      dispatch(networkActions.filterSelection(event.nodes));
    },
    deselectNode: function(event) {
      dispatch(networkActions.filterSelection(event.nodes));
    }
  };

  const _onMouseMove = e => {
    if (dragStart) {
      setCursorPosition({ x: e.x, y: e.y });
    }
  };

  const dragBoxStyle = () => {
    if (dragStart && cursorPosition) {
      return {
        backgroundColor: '#fed8b1',
        opacity: 0.4,
        zIndex: 999999,
        position: 'absolute',
        left: `${dragStart.window.x < cursorPosition.x ? dragStart.window.x : cursorPosition.x}px`,
        top: `${dragStart.window.y < cursorPosition.y ? dragStart.window.y : cursorPosition.y}px`,
        width: `${Math.abs(dragStart.window.x - cursorPosition.x)}px`,
        height: `${Math.abs(dragStart.window.y - cursorPosition.y)}px`
      };
    }
  };

  const fit = (offsetX, offsetY, offsetZoom) => {
    const pos = [];
    Object.values(network.getPositions()).forEach(value => {
      pos.push(value);
    });
    const bounds = [getMinVal(pos, 'x'), getMinVal(pos, 'y'), getMaxVal(pos, 'x'), getMaxVal(pos, 'y')];
    const ranges = [Math.abs(bounds[0]) + Math.abs(bounds[2]), Math.abs(bounds[1]) + Math.abs(bounds[3])];
    let zoom;
    if (ranges[0] < 50 && ranges[1] < 50) {
      zoom = 1.0;
    } else {
      zoom = 0.5 * Math.min(screenInfo.width / ranges[0], screenInfo.height / ranges[1]);
    }
    return {
      position: {
        x: bounds[0] + ranges[0] / 2 + offsetX,
        y: bounds[1] + ranges[1] / 2 + offsetY
      },
      scale: zoom * offsetZoom,
      animation: {
        easingFunction: 'linear'
      }
    };
  };

  const getMinVal = (data, key) => {
    if (data.length === 0) {
      return -200;
    }
    let min = data[0][key];
    data.forEach(val => {
      if (val[key] < min) {
        min = val[key];
      }
    });
    return min;
  };

  const getMaxVal = (data, key) => {
    if (data.length === 0) {
      return 200;
    }
    let max = data[0][key];
    data.forEach(val => {
      if (val[key] > max) {
        max = val[key];
      }
    });
    return max;
  };

  return (
    <>
      <div style={dragBoxStyle()} />
      <Graph
        graph={graphInfo}
        options={options}
        events={events}
        getNetwork={network => {
          dispatch(networkActions.setNetwork(network));
        }}
      />
    </>
  );
};

export default Network;
