/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import { useMultiSelectHotkeys } from '../../utils/hotkeys';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions, viewActions } from '../../redux/actions';

const Network = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const { network, options, graphInfo, multiSelectState } = useSelector(state => state.network);
  const [dragStart, setDragStart] = useState({ window: { x: 0, y: 0 } });
  const [cursorPosition, setCursorPosition] = useState(null);
  const [ctrl, setCtrl] = useState(false);
  const dispatch = useDispatch();
  useMultiSelectHotkeys(setCtrl);

  useEffect(() => {
    if (network) {
      if (!menuVisible && !sideMenuVisible && !nodeDetailVisible) {
        network.moveTo(fit(0, 0, 1.0));
      } else if (nodeDetailVisible && screenInfo.width < screenInfo.breakpoint) {
        network.moveTo(fit(0, screenInfo.height * 0.7, 0.3));
      } else if ((nodeDetailVisible) && menuVisible) {
        network.moveTo(fit(screenInfo.width * 0.7, screenInfo.height * 0.7, 0.3));
      } else if (menuVisible) {
        network.moveTo(fit(0, screenInfo.height * 0.7, 0.3));
      } else if ((nodeDetailVisible) && !menuVisible) {
        network.moveTo(fit(screenInfo.width * 0.3, 0, 0.7));
      }
    }
  }, [menuVisible, sideMenuVisible, nodeDetailVisible]);

  const events = {
    doubleClick: function(event) {
      if (!event.nodes.length) {
        const rootPosition = network.getPositions([0])[0];
        if (
          inBounds(
            event.pointer.canvas,
            { x: rootPosition.x - 60, y: rootPosition.y + 90 },
            { x: rootPosition.x + 90, y: rootPosition.y - 60 }
          )
        ) {
          event.nodes.push(0);
        }
      }
      dispatch(networkActions.addNodeFromClick(event));
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
      if(event.nodes && event.nodes[0] !== 0){
        dispatch(viewActions.setNodeDetailVisible(true));
      }
    },
    deselectNode: function(event) {
      dispatch(networkActions.filterSelection(event.nodes));
      if(event.nodes.length === 0){
        dispatch(viewActions.setNodeDetailVisible(false));
      }
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
    let min = data[0][key];
    data.forEach(val => {
      if (val[key] < min) {
        min = val[key];
      }
    });
    return min;
  };

  const getMaxVal = (data, key) => {
    let max = data[0][key];
    data.forEach(val => {
      if (val[key] > max) {
        max = val[key];
      }
    });
    return max;
  };

  /**
   * determine if a given position is between the bounds of a start and end point.
   *
   * @param {} position
   * @param {*} start
   * @param {*} end
   */
  const inBounds = (position, start, end) => {
    return position && start && end && inBoundsOneAxis(position.x, start.x, end.x) && inBoundsOneAxis(position.y, start.y, end.y);
  };

  const inBoundsOneAxis = (position, start, end) => {
    return (position < start && position > end) || (position > start && position < end);
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
