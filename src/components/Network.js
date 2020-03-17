/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import '../stylesheets/Network.scss';
import { BOTTOM_MENU_SIZE } from '../config/panel-size-constants';
import { useNetworkHotkeys } from '../utils/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';

const Network = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible } = useSelector(state => state.view);
  const { network, options, graphInfo, multiSelectState } = useSelector(state => state.network);

  const [dragStart, setDragStart] = useState({ window: { x: 0, y: 0 } });
  const [cursorPosition, setCursorPosition] = useState(null);
  const [ctrl, setCtrl] = useState(false);

  const dispatch = useDispatch();

  useNetworkHotkeys(setCtrl);

  useEffect(() => {
    if (network) {
      const node = Object.keys(network.body.nodes)[0];
      if (!menuVisible && !sideMenuVisible) {
        network.fit(setMove());
      } else if (menuVisible) {
        network.focus(
          node,
          setMove(
            sideMenuVisible || nodeDetailVisible ? 0.3 * window.innerWidth : 0,
            window.innerHeight > 600 ? BOTTOM_MENU_SIZE - 300 : 0,
            0.3
          )
        );
      } else if (sideMenuVisible && !menuVisible) {
        network.focus(node, setMove(0.3 * window.innerWidth, 0, 0.6));
      }
    }
  }, [menuVisible, sideMenuVisible]);

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

  const setMove = (x, y, scale) => {
    return {
      scale: scale,
      offset: { x: -x, y: -y },
      animation: {
        duration: 500,
        easingFunction: 'linear'
      }
    };
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
