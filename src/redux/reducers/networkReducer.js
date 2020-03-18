import { networkData } from '../../config/';
import elements from '../../constants/elements';

const defaultState = {
  network: null,
  options: networkData.options,
  graphInfo: networkData.defaultData,
  elementIndex: 1,
  selectedNodes: null,
  modalVisible: false,
  defaultState: true,
  addEdgeState: false,
  multiSelectState: false,
  organizeState: false
};

const networkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NODE_CLICK':
      const id = state.elementIndex; // todo import uuid from "uuid";
      const nodesCopy = state.graphInfo.nodes.slice();
      const x = action.payload.pointer.canvas.x;
      const y = action.payload.pointer.canvas.y;
      nodesCopy.push({ ...elements[state.elementIndex], x: x, y: y });
      const edgesCopy = state.graphInfo.edges.slice();
      if (action.payload.nodes.length) {
        edgesCopy.push({ from: action.payload.nodes[0], to: id });
      }
      return (state = {
        ...state,
        graphInfo: { nodes: nodesCopy, edges: edgesCopy },
        elementIndex: state.elementIndex + 1,
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
      });

    case 'ADD_NODE_MENU':
      const nodes = state.graphInfo.nodes.slice();
      const nodeX = state.elementIndex % 2 ? 30 : -30;
      const nodeY = state.elementIndex % 3 ? 30 : -30;
      nodes.push({ ...elements[state.elementIndex], x: nodeX, y: nodeY });
      return (state = {
        ...state,
        graphInfo: { ...state.graphInfo, nodes: nodes },
        elementIndex: state.elementIndex + 1,
        defaultState: true,
        addEdgeState: false,
        multiSelectState: false
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
      return (state = { ...state, elementIndex: action.payload });

    case 'SET_MODAL_VISIBLE':
      return setModalVisible(state, action.payload);

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
  for (var i = graphCopy.nodes.length - 1; i >= 0; i--) {
    if (state.selectedNodes.includes(graphCopy.nodes[i].id)) {
      graphCopy.nodes.splice(i, 1);
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

export default networkReducer;
