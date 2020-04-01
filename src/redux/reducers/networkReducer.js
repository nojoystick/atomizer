import { networkData } from '../../config/';
import elements from '../../constants/elements';
import { v4 as uuidv4 } from 'uuid';
import Theme from '../../stylesheets/Theme';
import Audio from '../../audio/Audio';
import { frequency, volume } from '../../constants/frequencies';

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
  audio: {
    playing: false,
    beatIndex: 0,
    masterGain: 0.5,
    masterTempo: 120,
    lpFilterFrequency: 0.1,
    lpFilterQ: 0.1,
    hpFilterFrequency: 0.1,
    hpFilterQ: 0.1
  }
};

const networkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NODE_CLICK':
      const id = uuidv4();
      const nodesCopy = state.graphInfo.nodes.slice();
      const x = action.payload.pointer.canvas.x;
      const y = action.payload.pointer.canvas.y;
      const osc = addOscillatorNode(state, state.elementIndex, id);
      nodesCopy.push({ ...elements(state.theme)[state.elementIndex - 1], id: id, x: x, y: y, oscillator: osc });
      const edgesCopy = state.graphInfo.edges.slice();
      if (action.payload.nodes.length) {
        edgesCopy.push({ from: action.payload.nodes[0], to: id });
      }
      return (state = {
        ...state,
        graphInfo: { nodes: nodesCopy, edges: edgesCopy },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
      });

    case 'ADD_NODE_MENU':
      const _id = uuidv4();
      const nodes = state.graphInfo.nodes.slice();
      const nodeX = state.elementIndex % 2 ? 30 : -30;
      const nodeY = state.elementIndex % 3 ? 30 : -30;
      const _osc = addOscillatorNode(state, state.elementIndex - 1, _id);
      nodes.push({ ...elements(state.theme)[state.elementIndex - 1], id: _id, x: nodeX, y: nodeY, oscillator: _osc });
      return (state = {
        ...state,
        graphInfo: { ...state.graphInfo, nodes: nodes },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
      });

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
                if (nodeData.from !== nodeData.to) {
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
      return (state = { ...state, addEdgeState: !state.addEdgeState, multiSelectState: false, defaultState: state.addEdgeState });

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
      return { ...state, selectedNodes: select };

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
      playOrPause(state);
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

    case 'SET_OPTIONS':
      return (state = { ...state, options: action.payload });

    case 'SET_GRAPH_INFO':
      return (state = { ...state, graphInfo: action.payload });

    case 'SET_ELEMENT_INDEX':
      if (action.payload > 0 && action.payload <= elements(state.theme).length) {
        return (state = { ...state, elementIndex: action.payload });
      } else return state;

    case 'SET_BEAT_INDEX':
      return { ...state, audio: { ...state.audio, beatIndex: action.payload } };

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

    case 'SET_THEME':
      // todo redraw the existing nodes when the theme changes
      // const el = elements(action.payload);
      // const _nodes = state.network.body.nodes;
      // Object.values(_nodes).forEach(node => {
      //   node.options.color = el.find(item => item.atomicNumber === node.options.atomicNumber).color;
      // })
      // state.network.setData({nodes: _nodes});
      return (state = { ...state, theme: action.payload });

    case 'STOP':
      stop();
      return { ...state, audio: { ...state.audio, playing: false, beatIndex: 0 } };

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

const addOscillatorNode = (state, atomicNumber, id) => {
  const oscillatorGainNode = Audio.context.createGain();
  oscillatorGainNode.gain.setValueAtTime(0.3, Audio.context.currentTime);
  oscillatorGainNode.connect(Audio.preampGainNode);

  const oscillatorValues = {
    oscillatorGainNode: oscillatorGainNode,
    gain: 0.3,
    id: id
  };

  return oscillatorValues;
};

const muteOscillatorNode = node => {
  node.oscillatorGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.05);
};

const playOrPause = state => {
  if (state.audio.playing) {
    stop();
  } else {
    Audio.masterGainNode.gain.setTargetAtTime(state.audio.masterGain, Audio.context.currentTime, 0.001);
  }
};

const stop = () => {
  Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001);
};

export default networkReducer;
