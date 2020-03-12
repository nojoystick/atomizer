import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";
import '../stylesheets/Network.scss'
import { config, networkStateConstants } from '../constants/network-constants'
import utils from '../utils/network-utils';
import { useNetworkHotkeys } from '../utils/hooks';

const Network= ({menuVisible, state, setState}) => {
  const [graphInfo, setGraphInfo] = useState(config.defaultData);
  const [options, setOptions] = useState(config.options);
  const [elementIndex, setElementIndex] = useState(1);
  const [network, setNetwork] = useState(null);
  const [dragStart, setDragStart] = useState({window: {x: 0, y: 0}});
  const [cursorPosition, setCursorPosition] = useState(null);
  const [prevState, setPrevState] = useState(state);
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
  }

  useNetworkHotkeys(setCtrl);

  useEffect(() => {
    networkUtilProps.event = [];
    Object.keys(networkStateConstants).forEach(key => {
      if(state === networkStateConstants[key].key){
        networkUtilProps.event = [];
        if(networkStateConstants[key].action){
          networkStateConstants[key].action(networkUtilProps);
        }
        if(!networkStateConstants[key].sticky){
          setState(null);
        }
      }
    })

    if(state === networkStateConstants.MULTISELECT.key){
      const opt = ({...options, interaction: {...options.interaction, dragView: false}});
      setOptions(opt);
    }

    if(prevState === networkStateConstants.MULTISELECT.key && state !== prevState){
      const opt = {...options, interaction: {...options.interaction, dragView: true}};
      setCursorPosition(null);
      setDragStart(null);
      setOptions(opt);
      // network.setOptions(opt);
      // setNetwork(network);
    }
    if(prevState === networkStateConstants.ADD_EDGES.key && state !== prevState){
      const opt = {...options, manipulation: {}};
      setOptions(opt);
      // network.setOptions(opt);
      // setNetwork(network);
    }
    setPrevState(state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const events = {
    doubleClick: function(event) {
        const props = setNetworkUtilProps(event, networkUtilProps);
        utils.addNode(props);
    },
    dragStart: function(event) {
      if(!event.nodes.length && state === networkStateConstants.MULTISELECT.key){
        document.addEventListener("mousemove", _onMouseMove);
        setDragStart({canvas: event.pointer.canvas, window: {x: event.event.srcEvent.x, y: event.event.srcEvent.y}, ctrl: ctrl});
      }  
    },
    dragEnd: function(event) {
      if(!event.nodes.length && state === networkStateConstants.MULTISELECT.key && dragStart.canvas)
      {
        const props = setNetworkUtilProps(event, networkUtilProps);
        utils.multiSelect(dragStart, props);
        setDragStart(null);
        setCursorPosition(null);
      }
      document.removeEventListener("mousemove", _onMouseMove);
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
    <div className='graphContainer'>
      <div style={dragBoxStyle()}/>
      <Graph 
          graph={graphInfo}
          options={options}
          events={events}
          getNetwork={network => { setNetwork(network) }}
          setNetwork={network}
        />
    </div>
    </>
  )
}

const setNetworkUtilProps = (event, props) => {
  event ? props.event = event : props.event = {};
  return props;
}

export default Network;