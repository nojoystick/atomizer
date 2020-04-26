import { networkData } from '../../config/';
import elements from '../../constants/elements';
import { v4 as uuidv4 } from 'uuid';
import Theme from '../../stylesheets/Theme';
import Audio from '../../audio/Audio';
import { frequency, volume } from '../../constants/frequencies';
import Node from '../../audio/Node';
import NodeData from '../../audio/NodeData';

const defaultState = {
  theme: Theme.light,
  network: null,
  options: networkData.options,
  graphInfo: networkData.defaultData,
  elementIndex: 1,
  selectedNodes: null,
  modalVisible: false,
  defaultState: true,
  addEdgeState: false,
  multiSelectState: false,
  organizeState: false,
  fit: false,
  audio: {
    playing: false,
    key: { label: 'A', value: 21 },
    disposition: 'M',
    masterGain: 0.5,
    masterTempo: 120,
    lpFilterFrequency: 0.1,
    lpFilterQ: 0.1,
    hpFilterFrequency: 0.1,
    hpFilterQ: 0.1,
    nodeData: NodeData,
    somethingIsMuted: false,
    somethingIsSoloed: false
  }
};

const networkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NODE_CLICK':
      const id = uuidv4();
      const nodesCopy = state.graphInfo.nodes.slice();
      const x = action.payload.pointer.canvas.x;
      const y = action.payload.pointer.canvas.y;
      const audioNode = state.audio.nodeData[state.elementIndex];
      nodesCopy.push({ ...elements(state.theme)[state.elementIndex - 1], id: id, x: x, y: y, audioNode: audioNode });
      const edgesCopy = state.graphInfo.edges.slice();
      if (action.payload.nodes.length) {
        edgesCopy.push({ from: action.payload.nodes[0], to: id });
      }
      return {
        ...state,
        graphInfo: { nodes: nodesCopy, edges: edgesCopy },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
      };

    case 'ADD_NODE_MENU':
      const _id = uuidv4();
      const nodes = state.graphInfo.nodes.slice();
      const nodeX = state.elementIndex % 2 ? 30 : -30;
      const nodeY = state.elementIndex % 3 ? 30 : -30;
      const _audioNode = state.audio.nodeData[state.elementIndex];
      nodes.push({ ...elements(state.theme)[state.elementIndex - 1], id: _id, x: nodeX, y: nodeY, audioNode: _audioNode });
      return {
        ...state,
        graphInfo: { ...state.graphInfo, nodes: nodes },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
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
                  state.network.addEdgeMode();
                }
              }
            },
            layout: state.options.layout,
            physics: state.options.physics
          };
      state.network.setOptions(opt);
      state.addEdgeState ? state.network.disableEditMode() : state.network.addEdgeMode();
      return { ...state, addEdgeState: !state.addEdgeState, multiSelectState: false, defaultState: state.addEdgeState };

    case 'DEFAULT_MODE':
      state.network.disableEditMode();
      return { ...state, options: networkData.options, defaultState: true, addEdgeState: false, multiSelectState: false };

    case 'DELETE_SELECTED':
      if (!state.selectedNodes) {
        return state;
      } else if (state.selectedNodes.length > 5) {
        return setModalVisible(state, true);
      } else {
        return doDeletion(state);
      }

    case 'DELETE':
      return doDeletion(state);

    case 'EDIT_EDGE':
      state.network.editEdgeMode();
      return state;

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
      return (state = { ...state, network: action.payload });

    case 'SET_ELEMENT_INDEX':
      if (action.constraint) {
        if (state.audio.pianoRollData[action.payload]) {
          return { ...state, elementIndex: action.payload };
        } else if (state.elementIndex < action.payload) {
          // find the next highest existing element and set it
          // eslint-disable-next-line eqeqeq
          const currIndex = Object.keys(state.audio.pianoRollData).findIndex(el => el == state.elementIndex);
          const val = Object.keys(state.audio.pianoRollData)[currIndex + 1];
          return val && val !== 'id' ? { ...state, elementIndex: val } : state;
        } else {
          // find the next lowest existing element and set it
          // eslint-disable-next-line eqeqeq
          const currIndex = Object.keys(state.audio.pianoRollData).findIndex(el => el == state.elementIndex);
          const val = Object.keys(state.audio.pianoRollData)[currIndex - 1];
          return val && val > 0 ? { ...state, elementIndex: val } : state;
        }
      } else {
        if (action.payload > 0 && action.payload <= elements(state.theme).length) {
          return { ...state, elementIndex: action.payload };
        } else return state;
      }

    case 'SET_LP_FILTER_FREQUENCY':
      Audio.lpFilter.frequency.setValueAtTime(frequency[action.payload], Audio.context.currentTime);
      return { ...state, audio: { ...state.audio, lpFilterFrequency: frequency[action.payload] } };

    case 'SET_LP_FILTER_Q':
      Audio.lpFilter.Q.setValueAtTime(volume[action.payload] * 1000, Audio.context.currentTime);
      return { ...state, audio: { ...state.audio, lpFilterQ: action.payload } };

    case 'SET_HP_FILTER_FREQUENCY':
      Audio.hpFilter.frequency.setValueAtTime(frequency[action.payload], Audio.context.currentTime);
      return { ...state, audio: { ...state.audio, hpFilterFrequency: frequency[action.payload] } };

    case 'SET_HP_FILTER_Q':
      Audio.hpFilter.Q.setValueAtTime(volume[action.payload] * 1000, Audio.context.currentTime);
      return { ...state, audio: { ...state.audio, hpFilterQ: action.payload } };

    case 'SET_MASTER_VOLUME':
      const vol = action.scale === 'MIDI' ? volume[action.payload] : action.payload;
      Audio.masterGainNode.gain.setValueAtTime(vol, Audio.context.currentTime);
      return { ...state, audio: { ...state.audio, masterGain: vol } };

    case 'SET_TEMPO':
      return { ...state, audio: { ...state.audio, masterTempo: action.payload } };

    case 'SET_MODAL_VISIBLE':
      return setModalVisible(state, action.payload);

    case 'SET_KEY':
      return { ...state, audio: { ...state.audio, key: action.payload } };

    case 'SET_DISPOSITION':
      return { ...state, audio: { ...state.audio, disposition: action.payload } };

    case 'SET_PIANO_ROLL_DATA':
      return { ...state, audio: { ...state.audio, pianoRollData: action.payload } };

    case 'SET_PIANO_ROLL_FOR_ELEMENT':
      return {
        ...state,
        audio: { ...state.audio, pianoRollData: { ...state.audio.pianoRollData, [action.index]: action.payload } }
      };

    case 'SET_THEME':
      if (action.payload === state.theme) {
        return state;
      }
      updateColorsForTheme(state.network, action.payload);
      return { ...state, theme: action.payload };

    case 'STOP':
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
      // login required.
      // pull up the modal and allow the user to name their network
      // if they cancel, close it, if they click save:
      // save the network object to the database, under the current user, in a default state
      return state;

    case 'LOAD_NETWORK':
      // login required? or have some default options
      // pull up the modal and show the list of networks the user has created
      // if they cancel, close it
      // if they select one, load it in
      // also allow them to delete their saved networks from this view
      return state;

    case 'NEW_NETWORK':
      // if the current network is unsaved, pull up the modal
      // prompt them to either save it, abandon it, or cancel
      // then create a new network
      return state;

    case 'SEND_TO_LAB':
      // right now this is a no-op
      return state;

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
      return { ...state, audio: { ...state.audio, somethingIsMuted: somethingIsMuted } };

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
      return { ...state, audio: { ...state.audio, somethingIsSoloed: somethingIsSoloed, somethingIsMuted: _somethingIsMuted } };

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
      return { ...state, audio: { ...state.audio, somethingIsSoloed: somethingSolo, somethingIsMuted: somethingMute } };

    case 'CREATE_NODE_FOR_ELEMENT':
      return { ...state, audio: { ...state.audio, nodeData: { ...state.audio.nodeData, [action.payload]: new Node() } } };

    default:
      return state;
  }
};

const doDeletion = state => {
  state.network.deleteSelected(state.selectedNodes);
  const graphCopy = state.graphInfo;
  for (var i = graphCopy.nodes.length - 1; i > -1; i--) {
    if (state.selectedNodes.includes(graphCopy.nodes[i].id)) {
      graphCopy.nodes.splice(i, 1);
    }
  }
  return (state = { ...state, graphInfo: graphCopy, selectedNodes: null });
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
