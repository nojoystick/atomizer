/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";
import '../stylesheets/Network.scss'
import { config, networkStateConstants } from '../constants/network-constants'
import { BOTTOM_MENU_SIZE } from '../config/panel-size-constants'
import utils from '../utils/network-utils';
import { useNetworkHotkeys } from '../utils/hooks';

const Network= ({visibleProps, networkProps}) => {
  const { menuVisible, sideMenuVisible, nodeEditorVisible} = visibleProps;
  const { networkState, setNetworkState, selectedNodes, setSelectedNodes, network, setNetwork} = networkProps;

  const [graphInfo, setGraphInfo] = useState(config.defaultData);
  const [options, setOptions] = useState(config.options);
  const [elementIndex, setElementIndex] = useState(1);
  const [dragStart, setDragStart] = useState({window: {x: 0, y: 0}});
  const [cursorPosition, setCursorPosition] = useState(null);
  const [prevState, setPrevState] = useState(networkState);
  const [ctrl, setCtrl] = useState(false);

  const networkUtilProps = {
    event: {},
    graphInfo: graphInfo,
    setGraphInfo: setGraphInfo,
    options: options,
    setOptions: setOptions,
    elementIndex: elementIndex,
    setElementIndex: setElementIndex,
    network: network,
    setNetwork: setNetwork,
    selectedNodes: selectedNodes,
    setSelectedNodes: setSelectedNodes
  }

  useNetworkHotkeys(setCtrl);

  useEffect(() => {
    if(network){
      const node = Object.keys(network.body.nodes)[0];
      if(!menuVisible && !sideMenuVisible){
        network.fit(utils.setMove());
      }
      else if(menuVisible){
        network.focus(node, utils.setMove((sideMenuVisible || nodeEditorVisible) ? 0.3*window.innerWidth : 0, window.innerHeight > 600 ? BOTTOM_MENU_SIZE-300 : 0, 0.3));
      }
      else if(sideMenuVisible && !menuVisible){
        network.focus(node, utils.setMove(0.3*window.innerWidth, 0, 0.6));
      }
    }
  }, [menuVisible, sideMenuVisible])

  useEffect(() => {
    networkUtilProps.event = [];
    Object.keys(networkStateConstants).forEach(key => {
      if(networkState === networkStateConstants[key].key){
        networkUtilProps.event = [];
        if(networkStateConstants[key].action){
          networkStateConstants[key].action(networkUtilProps);
        }
        if(!networkStateConstants[key].sticky){
          setNetworkState(null);
        }
      }
    })

    if(networkState === networkStateConstants.MULTISELECT.key){
      const opt = ({...options, interaction: {...options.interaction, dragView: false}});
      setOptions(opt);
    }

    if(prevState === networkStateConstants.MULTISELECT.key && networkState !== prevState){
      const opt = {...options, interaction: {...options.interaction, dragView: true}};
      setCursorPosition(null);
      setDragStart(null);
      setOptions(opt);
    }
    if(prevState === networkStateConstants.ADD_EDGES.key && networkState !== prevState){
      const opt = {...options, manipulation: {}};
      setOptions(opt);
    }
    setPrevState(networkState);
  }, [networkState])

  const events = {
    doubleClick: function(event) {
        if(!event.nodes.length){
          if(utils.inBounds(event.pointer.canvas, {x: -60, y: 90}, {x: 90, y: -60})){
            event.nodes.push(0);
          }
        }
        const props = setNetworkUtilProps(event, networkUtilProps);
        utils.addNode(props);
    },
    dragStart: function(event) {
      if(!event.nodes.length && networkState === networkStateConstants.MULTISELECT.key){
        document.addEventListener("mousemove", _onMouseMove);
        setDragStart({canvas: event.pointer.canvas, window: {x: event.event.srcEvent.x, y: event.event.srcEvent.y}, ctrl: ctrl});
      }  
    },
    dragEnd: function(event) {
      if(!event.nodes.length && networkState === networkStateConstants.MULTISELECT.key && dragStart.canvas)
      {
        const props = setNetworkUtilProps(event, networkUtilProps);
        utils.multiSelect(dragStart, props);
        setDragStart(null);
        setCursorPosition(null);
      }
      document.removeEventListener("mousemove", _onMouseMove);
    },
    selectNode: function(event) {
      utils.filterSelection(event.nodes, networkUtilProps);
    },
    deselectNode: function(event) {
      utils.filterSelection(event.nodes, networkUtilProps);
    }
  }

  const _onMouseMove = (e) => {
    if(dragStart){
      setCursorPosition({ x: e.x, y: e.y });
    }
  }

  const dragBoxStyle = () => {
    if(dragStart && cursorPosition) {
      return {
        backgroundColor: '#fed8b1',
        opacity: 0.4,
        zIndex: 999999,
        position: 'absolute',
        left: `${(dragStart.window.x < cursorPosition.x) ? dragStart.window.x : cursorPosition.x}px`,
        top: `${(dragStart.window.y < cursorPosition.y) ? dragStart.window.y : cursorPosition.y}px`,
        width: `${Math.abs(dragStart.window.x - cursorPosition.x)}px`,
        height: `${Math.abs(dragStart.window.y - cursorPosition.y)}px`,
      }
    }
  }
  
  return (
    <>
      <div style={dragBoxStyle()}/>
      <Graph 
          graph={graphInfo}
          options={options}
          events={events}
          getNetwork={network => { setNetwork(network) }}
          setNetwork={network}
        />
    </>
  )
}

const setNetworkUtilProps = (event, props) => {
  event ? props.event = event : props.event = {};
  return props;
}

export default Network;