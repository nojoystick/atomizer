import { networkData } from '../../config/';
import elements from '../../constants/elements';
import { v4 as uuidv4 } from 'uuid';
import Theme from '../../stylesheets/Theme';
import Audio from '../../audio/Audio';
import { volume } from '../../constants/frequencies';
import Node from '../../audio/Node';
import { networkActions } from '../actions';

const defaultState = {
  theme: Theme.light,
  loadedNetworkName: null,
  network: null,
  options: networkData.options,
  graphInfo: networkData.defaultData,
  shouldUpdateNetwork: 0,
  elementIndex: 1,
  selectedNodes: null,
  modalVisible: false,
  defaultState: true,
  addEdgeState: false,
  multiSelectState: false,
  organizeState: false,
  fit: false,
  unsavedChanges: false,
  audio: {
    playing: false,
    key: { label: 'A', value: 21 },
    disposition: 'M',
    masterGain: 0.5,
    masterTempo: 120,
    nodeData: null,
    somethingIsMuted: false,
    somethingIsSoloed: false
  },
  networkToSave: null,
  shouldLoadNetwork: null
};

const networkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NODE_CLICK':
      const id = uuidv4();
      const nodesCopy = state.graphInfo.nodes.slice();
      const x = action.payload.pointer.canvas.x;
      const y = action.payload.pointer.canvas.y;
      const audioNode = state.audio.nodeData[state.elementIndex];
      audioNode.parseSolo(state.somethingIsSoloed);
      nodesCopy.push({ ...elements(state.theme)[state.elementIndex - 1], id: id, x: x, y: y, audioNode: audioNode });
      return {
        ...state,
        graphInfo: { nodes: nodesCopy, edges: state.graphInfo.edges },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false,
        shouldUpdateNetwork: state.shouldUpdateNetwork + 1,
        unsavedChanges: true
      };

    case 'ADD_NODE_MENU':
      const _id = uuidv4();
      const nodes = state.graphInfo.nodes.slice();
      const nodeX = state.elementIndex % 2 ? 30 : -30;
      const nodeY = state.elementIndex % 3 ? 30 : -30;
      const _audioNode = state.audio.nodeData[state.elementIndex];
      _audioNode.parseSolo(state.somethingIsSoloed);
      nodes.push({ ...elements(state.theme)[state.elementIndex - 1], id: _id, x: nodeX, y: nodeY, audioNode: _audioNode });
      return {
        ...state,
        graphInfo: { ...state.graphInfo, nodes: nodes },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false,
        shouldUpdateNetwork: state.shouldUpdateNetwork + 1,
        unsavedChanges: true
      };

    case 'ADD_EDGE':
      const opt = state.addEdgeState
        ? {
            ...state.options,
            manipulation: {},
            ...state.options
          }
        : {
            ...state.options,
            manipulation: {
              ...state.options.manipulation,
              addEdge: function(nodeData, callback) {
                if (
                  nodeData.from !== nodeData.to &&
                  noLoop(nodeData.from, nodeData.to, state.network.body.nodes) &&
                  noDupe(nodeData.from, nodeData.to, state.network.body.nodes)
                ) {
                  callback(nodeData);
                  action.dispatch(networkActions.shouldUpdateNetwork());
                  state.network.addEdgeMode();
                }
              }
            },
            layout: state.options.layout,
            physics: state.options.physics
          };
      state.network.setOptions(opt);
      state.addEdgeState ? state.network.disableEditMode() : state.network.addEdgeMode();
      return {
        ...state,
        addEdgeState: !state.addEdgeState,
        multiSelectState: false,
        defaultState: state.addEdgeState,
        unsavedChanges: true
      };

    case 'DEFAULT_MODE':
      state.network.disableEditMode();
      return { ...state, options: networkData.options, defaultState: true, addEdgeState: false, multiSelectState: false };

    case 'DELETE_SELECTED':
      if (state.selectedNodes && state.selectedNodes.length > 5) {
        return setModalVisible(state, true);
      } else {
        return doDeletion(state);
      }

    case 'DELETE':
      return doDeletion(state);

    case 'EDIT_EDGE':
      state.network.editEdgeMode();
      return { state, unsavedChanges: true };

    case 'FILTER_SELECTION':
      const select = filterSelection(state, action.payload);
      state.network.setSelection({ nodes: select });
      const _elIndex = state.network.body.nodes[select[select.length - 1]]
        ? state.network.body.nodes[select[select.length - 1]].options.atomicNumber
        : state.elementIndex;
      return { ...state, elementIndex: _elIndex, selectedNodes: select };

    case 'FIT':
      return { ...state, fit: action.payload !== undefined ? action.payload : true };

    case 'MULTISELECT':
      const { dragStart, event } = action.payload;
      const positionMap = { nodes: [], positions: {} };
      state.graphInfo.nodes.forEach(node => {
        positionMap.nodes.push(node.id);
      });
      positionMap.positions = state.network.getPositions(positionMap.nodes);
      const selectedNodes = [];
      positionMap.nodes.forEach(node => {
        if (inBounds(positionMap.positions[node], dragStart.canvas, event.pointer.canvas)) {
          selectedNodes.push(node);
        }
      });
      const sel = dragStart.ctrl ? state.network.getSelectedNodes().concat(selectedNodes) : selectedNodes;
      const fil = filterSelection(state, sel);
      state.network.setSelection({ nodes: fil });
      return { ...state, selectedNodes: fil };

    case 'ORGANIZE':
      const newOptions = state.organizeState
        ? { ...state.options, layout: { hierarchical: { ...state.options.layout.hierarchical, enabled: false } } }
        : { ...state.options, layout: { hierarchical: { ...state.options.layout.hierarchical, enabled: true } } };
      return {
        ...state,
        options: newOptions,
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false,
        organizeState: !state.organizeState
      };

    case 'PLAY_OR_PAUSE':
      return { ...state, audio: { ...state.audio, playing: !state.audio.playing } };

    case 'SELECT_ALL':
      const n = [];
      state.graphInfo.nodes.forEach(node => {
        n.push(node.id);
      });

      if (
        n.sort().join(',') ===
        state.network
          .getSelectedNodes()
          .sort()
          .join(',')
      ) {
        state.network.unselectAll();
        return { ...state, selectedNodes: null };
      } else {
        const filtered = filterSelection(state, n);
        state.network.setSelection({ nodes: filtered });
        return { ...state, selectedNodes: filtered };
      }

    case 'SET_NETWORK':
      return { ...state, network: action.payload };

    case 'SET_DATASET':
      return { ...state, dataset: action.payload };

    case 'SET_ELEMENT_INDEX':
      if (action.payload > 0 && action.payload <= elements(state.theme).length) {
        return { ...state, elementIndex: action.payload };
      } else return state;

    case 'SET_MASTER_VOLUME':
      const vol = action.scale === 'MIDI' ? volume[action.payload] : action.payload;
      Audio.masterGainNode.gain.setValueAtTime(vol, Audio.context.currentTime);
      return { ...state, unsavedChanges: true, audio: { ...state.audio, masterGain: vol } };

    case 'SET_TEMPO':
      return { ...state, unsavedChanges: true, audio: { ...state.audio, masterTempo: action.payload } };

    case 'SET_MODAL_VISIBLE':
      return setModalVisible(state, action.payload);

    case 'SET_KEY':
      return { ...state, unsavedChanges: true, audio: { ...state.audio, key: action.payload } };

    case 'SET_DISPOSITION':
      return { ...state, unsavedChanges: true, audio: { ...state.audio, disposition: action.payload } };

    case 'SET_PIANO_ROLL_DATA':
      return { ...state, unsavedChanges: true, audio: { ...state.audio, nodeData: action.payload } };

    case 'SET_THEME':
      if (action.payload === state.theme) {
        return state;
      }
      updateColorsForTheme(state.network, action.payload);
      return { ...state, theme: action.payload };

    case 'STOP':
      Object.values(state.network.body.nodes).forEach(node => {
        node.options.color.border = node.options.color.hover.border;
      });
      return { ...state, audio: { ...state.audio, playing: false } };

    case 'TOGGLE_SELECT':
      const op = state.multiSelectState
        ? { ...state.options, interaction: { ...state.options.interaction, dragView: true } }
        : { ...state.options, interaction: { ...state.options.interaction, dragView: false } };
      return {
        ...state,
        options: op,
        multiSelectState: !state.multiSelectState,
        addEdgeState: false,
        defaultState: state.multiSelectState
      };

    case 'SAVE_NETWORK':
      const networkJSON = { name: state.loadedNetworkName, audio: {}, nodes: [], edges: [], nodeData: {} };
      Object.values(state.network.body.edges).forEach(edge => {
        networkJSON.edges.push({ from: edge.fromId, to: edge.toId });
      });
      state.graphInfo.nodes.forEach(node => {
        networkJSON.nodes.push({ ...node, audioNode: node.audioNode.transformToPureObject() });
      });
      Object.keys(state.audio).forEach(key => {
        networkJSON.audio = { ...networkJSON.audio, [key]: state.audio[key] };
      });
      networkJSON.audio.nodeData = {};
      Object.keys(state.audio.nodeData).forEach(key => {
        networkJSON.nodeData = { ...networkJSON.nodeData, [key]: state.audio.nodeData[key].transformToPureObject() };
      });
      return {
        ...state,
        networkToSave: networkJSON,
        unsavedChanges: false,
        audio: {
          ...state.audio,
          playing: false
        }
      };

    case 'LOAD_NETWORK':
      const _nodes = [];
      let _nodeData = {};
      action.payload.nodeData &&
        Object.keys(action.payload.nodeData).forEach(key => {
          _nodeData = { ..._nodeData, [key]: Node.renderFromJSON(action.payload.nodeData[key]) };
        });
      action.payload.nodes &&
        action.payload.nodes.forEach(node => {
          _nodes.push({ ...node, audioNode: _nodeData[node.atomicNumber] });
        });
      return {
        ...state,
        loadedNetworkName: action.payload.name,
        graphInfo: { nodes: _nodes, edges: action.payload.edges },
        unsavedChanges: false,
        audio: {
          ...action.payload.audio,
          playing: false,
          nodeData: _nodeData
        }
      };

    case 'NEW_NETWORK':
      return { ...defaultState, theme: state.theme, network: state.network };

    case 'SET_MUTED':
      let somethingIsMuted = false;
      Object.keys(state.network.body.nodes).forEach(key => {
        if (state.selectedNodes && state.selectedNodes.includes(key)) {
          state.network.body.nodes[key].options.audioNode.toggleMute();
          if (state.network.body.nodes[key].options.audioNode.mute === true) {
            setColorForState('mute', key, state);
          } else {
            setColorForState('unmute', key, state);
          }
        }
        if (!state.selectedNodes || state.selectedNodes.length === 0) {
          if (state.audio.somethingIsMuted) {
            setColorForState('unmute', key, state);
            state.network.body.nodes[key].options.audioNode.setMute(false);
          } else {
            setColorForState('mute', key, state);
            state.network.body.nodes[key].options.audioNode.setMute(true);
          }
        }
        if (state.network.body.nodes[key].options.audioNode.mute === true) {
          somethingIsMuted = true;
        }
      });
      return { ...state, unsavedChanges: true, audio: { ...state.audio, somethingIsMuted: somethingIsMuted } };

    case 'SET_SOLOED':
      let somethingIsSoloed = false;
      let _somethingIsMuted = false;
      Object.keys(state.network.body.nodes).forEach(key => {
        if (state.selectedNodes && state.selectedNodes.includes(key)) {
          if (state.network.body.nodes[key].options.audioNode.solo !== 1) {
            if (
              state.network.body.nodes[key].options.audioNode.solo === -1 ||
              state.network.body.nodes[key].options.audioNode.mute
            ) {
              setColorForState('unmute', key, state);
              state.network.body.nodes[key].options.audioNode.setMute(false);
            }
            state.network.body.nodes[key].options.audioNode.setSolo(1);
          } else {
            state.network.body.nodes[key].options.audioNode.setSolo(-1);
            setColorForState('mute', key, state);
          }
          if (state.network.body.nodes[key].options.audioNode.mute) {
            state.network.body.nodes[key].options.audioNode.setMute(false);
            setColorForState('unmute', key, state);
          }
          if (state.network.body.nodes[key].options.audioNode.solo !== 1 && state.audio.somethingIsSoloed) {
            state.network.body.nodes[key].options.audioNode.setSolo(-1);
            setColorForState('mute', key, state);
          }
        } else if (
          state.selectedNodes &&
          state.selectedNodes.length > 0 &&
          state.network.body.nodes[key].options.audioNode.solo !== 1
        ) {
          state.network.body.nodes[key].options.audioNode.setSolo(-1);
          setColorForState('mute', key, state);
        }
        if (!state.selectedNodes || state.selectedNodes.length === 0) {
          state.network.body.nodes[key].options.audioNode.setSolo(0);
        }
        if (state.network.body.nodes[key].options.audioNode.solo === 1) {
          somethingIsSoloed = true;
        }
        if (state.network.body.nodes[key].options.audioNode.mute === true) {
          _somethingIsMuted = true;
        }
      });
      if (somethingIsSoloed) {
        Object.keys(state.network.body.nodes).forEach(key => {
          if (state.network.body.nodes[key].options.audioNode.solo !== 1) {
            state.network.body.nodes[key].options.audioNode.setSolo(-1);
            setColorForState('mute', key, state);
          }
        });
      } else {
        Object.keys(state.network.body.nodes).forEach(key => {
          state.network.body.nodes[key].options.audioNode.setSolo(0);
          if (state.network.body.nodes[key].options.audioNode.mute === false) {
            setColorForState('unmute', key, state);
          }
        });
      }
      return {
        ...state,
        unsavedChanges: true,
        audio: { ...state.audio, somethingIsSoloed: somethingIsSoloed, somethingIsMuted: _somethingIsMuted }
      };

    case 'IS_SOMETHING_MUTED_OR_SOLOED':
      let somethingMute = false;
      let somethingSolo = false;
      Object.keys(state.network.body.nodes).forEach(key => {
        if (state.network.body.nodes[key].options.audioNode.solo === 1) {
          somethingSolo = true;
        }
        if (state.network.body.nodes[key].options.audioNode.mute === true) {
          somethingMute = true;
          if (state.network.body.nodes[key].options.color.state !== 'mute') {
            setColorForState('mute', key, state);
          }
        } else if (state.network.body.nodes[key].options.color.state === 'mute') {
          setColorForState('unmute', key, state);
        }
      });
      return {
        ...state,
        unsavedChanges: true,
        audio: { ...state.audio, somethingIsSoloed: somethingSolo, somethingIsMuted: somethingMute }
      };

    case 'CREATE_NODE_FOR_ELEMENT':
      return { ...state, audio: { ...state.audio, nodeData: { ...state.audio.nodeData, [action.payload]: new Node() } } };

    case 'SHOULD_UPDATE_NETWORK':
      return { ...state, shouldUpdateNetwork: state.shouldUpdateNetwork + 1, unsavedChanges: true };

    case 'SET_SHOULD_SAVE_NETWORK':
      return {
        ...state,
        shouldSaveNetwork: action.payload ? action.payload : true,
        modalVisible: state.loadedNetworkName === null
      };

    case 'COPY_NODE_FROM_INDEX':
      return {
        ...state,
        audio: {
          ...state.audio,
          nodeData: {
            ...state.audio.nodeData,
            [state.elementIndex]: Node.renderFromJSON(state.audio.nodeData[action.payload].transformToPureObject())
          }
        }
      };
    default:
      return state;
  }
};

const doDeletion = state => {
  state.network.deleteSelected(state.selectedNodes);
  state.network.deleteSelected(state.network.getSelectedEdges());
  const graphCopy = state.graphInfo;
  for (var i = graphCopy.nodes.length - 1; i > -1; i--) {
    if (state.selectedNodes && state.selectedNodes.includes(graphCopy.nodes[i].id)) {
      graphCopy.nodes.splice(i, 1);
    }
  }
  return {
    ...state,
    graphInfo: graphCopy,
    selectedNodes: null,
    shouldUpdateNetwork: state.shouldUpdateNetwork + 1,
    unsavedChanges: true
  };
};

const filterSelection = (state, n) => {
  if (n === null) {
    state.network.unselectAll();
  } else {
    return n;
  }
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

const setModalVisible = (state, payload) => {
  return (state = { ...state, modalVisible: payload });
};

/**
 * make sure there are no loops in the network
 * @param from, to, nodes
 */
const noLoop = (from, to, nodes) => {
  let val = true;
  let nextLayer = nodes[to];
  val = searchGraphForLoop(from, nextLayer, nodes);
  return val;
};

/**
 * Recursively search for a loop back to the starting node
 */
const searchGraphForLoop = (from, node, nodes) => {
  let val = true;
  if (node.id === from) {
    return false;
  } else if (node.edges && node.edges.length > 0) {
    for (let i = 0; i < node.edges.length; i++) {
      if (node.edges[i].fromId === node.id) {
        val = searchGraphForLoop(from, nodes[node.edges[i].toId], nodes);
        if (val === false) {
          return val;
        }
      }
    }
  }
  return val;
};

/**
 * Detect duplicate edges and don't bother adding them
 */
const noDupe = (from, to, nodes) => {
  let val = true;
  nodes[from].edges.forEach(edge => {
    if (edge.toId === to) {
      val = false;
    }
  });
  return val;
};

const transformColor = (colorString, amount) => {
  const rgb = colorString[0] === '#' ? hexToRgb(colorString) : rgbaToRgb(colorString);
  const newColor = amount === 1.0 ? rgbToHex(rgb[0], rgb[1], rgb[2]) : rgbToRgba(rgb[0], rgb[1], rgb[2], amount);
  return newColor;
};

function hexToRgb(hex) {
  var bigint = parseInt(hex.substr(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return [r, g, b];
}

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

function rgbaToRgb(rgba) {
  return rgba.substr(5).split(', ');
}

function rgbToRgba(r, g, b, amount) {
  return `rgba(${r}, ${g}, ${b}, ${amount})`;
}

const setColor = (id, status, transformAmount, network) => {
  network.body.nodes[id].options.color.background = transformColor(
    network.body.nodes[id].options.color.background,
    transformAmount
  );
  network.body.nodes[id].options.color.border = transformColor(network.body.nodes[id].options.color.border, transformAmount);
  const highlightColor = transformColor(network.body.nodes[id].options.color.highlight.background, transformAmount);
  network.body.nodes[id].options.color.highlight.background = highlightColor;
  network.body.nodes[id].options.color.hover.background = highlightColor;
  network.body.nodes[id].options.color.state = status;
};

const setColorForState = (status, id, state) => {
  switch (status) {
    case 'mute':
      setColor(id, status, 0.2, state.network);
      break;
    case 'unmute':
      setColor(id, status, 1.0, state.network);
      break;
    default:
      return;
  }
};

const updateColorsForTheme = (network, theme) => {
  network &&
    Object.values(network.body.nodes).forEach(node => {
      if (node.options.state === 'mute') {
      } else {
        node.options.color.background = theme[node.options.category];
      }
    });
  return network;
};

export default networkReducer;
