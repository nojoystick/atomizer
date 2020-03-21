import { networkData } from '../../config/';
import elements from '../../constants/elements';
import { v4 as uuidv4 } from 'uuid';
import Theme from '../../stylesheets/Theme';
import Audio from '../../audio/Audio';
import { frequency, toPenta } from '../../constants/frequencies';

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
  oscillatorNodes: [],
  masterGainValue: 0.5
};

const networkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NODE_CLICK':
      const id = uuidv4();
      const nodesCopy = state.graphInfo.nodes.slice();
      const x = action.payload.pointer.canvas.x;
      const y = action.payload.pointer.canvas.y;
      nodesCopy.push({ ...elements(state.theme)[state.elementIndex], id: id, x: x, y: y });
      const edgesCopy = state.graphInfo.edges.slice();
      if (action.payload.nodes.length) {
        edgesCopy.push({ from: action.payload.nodes[0], to: id });
      }
      const osc = addOscillatorNode(state, state.elementIndex, id);
      return (state = {
        ...state,
        graphInfo: { nodes: nodesCopy, edges: edgesCopy },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false,
        oscillatorNodes: [...state.oscillatorNodes, osc]
      });

    case 'ADD_NODE_MENU':
      const _id = uuidv4();
      const nodes = state.graphInfo.nodes.slice();
      const nodeX = state.elementIndex % 2 ? 30 : -30;
      const nodeY = state.elementIndex % 3 ? 30 : -30;
      nodes.push({ ...elements(state.theme)[state.elementIndex], id: _id, x: nodeX, y: nodeY });
      const _osc = addOscillatorNode(state, state.elementIndex, _id);
      return (state = {
        ...state,
        graphInfo: { ...state.graphInfo, nodes: nodes },
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false,
        oscillatorNodes: [...state.oscillatorNodes, _osc]
      });

    case 'ADD_EDGE':
      const opt = state.addEdgeState
        ? {
            ...state.options,
            manipulation: networkData.options.manipulation,
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

    case 'PLAY':
      play(state);
      return state;

    case 'SELECT_ALL':
      const n = [];
      state.graphInfo.nodes.forEach(node => {
        n.push(node.id);
      });

      if (
        n
          .filter(id => id !== 0)
          .sort()
          .join(',') ===
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
      if (action.payload > 0 && action.payload < elements(state.theme).length) {
        return (state = { ...state, elementIndex: action.payload });
      } else return state;

    case 'SET_MODAL_VISIBLE':
      return setModalVisible(state, action.payload);

    case 'SET_THEME':
      // todo redraw the existing nodes
      // const el = elements(action.payload);
      // const _nodes = state.network.body.nodes;
      // Object.values(_nodes).forEach(node => {
      //   node.options.color = el.find(item => item.atomicNumber === node.options.atomicNumber).color;
      // })
      // state.network.setData({nodes: _nodes});
      return (state = { ...state, theme: action.payload });

    case 'STOP':
      stop();
      return state;

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

    default:
      return state;
  }
};

const doDeletion = state => {
  state.network.deleteSelected(state.selectedNodes);
  const graphCopy = state.graphInfo;
  const nodesCopy = state.oscillatorNodes;
  for (var i = graphCopy.nodes.length - 1; i >= 0; i--) {
    if (state.selectedNodes.includes(graphCopy.nodes[i].id)) {
      graphCopy.nodes.splice(i, 1);
      muteOscillatorNode(state.oscillatorNodes[i - 1]);
      nodesCopy.splice(i - 1, 1);
    }
  }
  return (state = { ...state, graphInfo: graphCopy, selectedNodes: null });
};

/**
 * Make sure the selected nodes list matches the network's list
 * and don't allow the root node to be selected
 */
const filterSelection = (state, n) => {
  if (n === null) {
    state.network.unselectAll();
  } else {
    const filteredNodes = n.filter(id => id !== 0);
    return filteredNodes;
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
  oscillatorGainNode.connect(Audio.masterGainNode);

  const oscillatorNode = Audio.context.createOscillator();
  oscillatorNode.connect(oscillatorGainNode);
  oscillatorNode.start();
  oscillatorNode.frequency.setValueAtTime(frequency[toPenta[atomicNumber]], Audio.context.currentTime);

  const oscillatorNodeValues = {
    oscillatorNode: oscillatorNode,
    oscillatorGainNode: oscillatorGainNode,
    frequency: oscillatorNode.frequency.value,
    type: oscillatorNode.type,
    gain: 0,
    id: id
  };

  return oscillatorNodeValues;
};

const muteOscillatorNode = node => {
  node.oscillatorGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.05);
  setTimeout(() => {
    node.oscillatorNode.stop();
  }, 1000);
};

// Fade in the MasterGainNode gain value to masterGainValue on mouseDown by .001 seconds
const play = state => {
  Audio.masterGainNode.gain.setTargetAtTime(state.masterGainValue, Audio.context.currentTime, 0.001);
};

// Fade out the MasterGainNode gain value to 0 on mouseDown by .001 seconds
const stop = () => {
  Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001);
};

export default networkReducer;