export const networkActions = {
  setNetwork: param => {
    return {
      type: 'SET_NETWORK',
      payload: param
    };
  },
  setOptions: param => {
    return {
      type: 'SET_OPTIONS',
      payload: param
    };
  },
  setGraphInfo: param => {
    return {
      type: 'SET_GRAPH_INFO',
      payload: param
    };
  },
  setElementIndex: param => {
    return {
      type: 'SET_ELEMENT_INDEX',
      payload: param
    };
  },
  setModalVisible: param => {
    return {
      type: 'SET_MODAL_VISIBLE',
      payload: param
    };
  },
  setSelectedNodes: param => {
    return {
      type: 'SET_SELECTED_NODES',
      payload: param
    };
  },
  setTheme: param => {
    return {
      type: 'SET_THEME',
      payload: param
    };
  },
  addNodeFromClick: event => {
    return {
      type: 'ADD_NODE_CLICK',
      payload: event
    };
  },
  addNodeFromMenu: () => {
    return {
      type: 'ADD_NODE_MENU'
    };
  },
  addEdge: () => {
    return {
      type: 'ADD_EDGE'
    };
  },
  defaultMode: () => {
    return {
      type: 'DEFAULT_MODE'
    };
  },
  editEdge: () => {
    return {
      type: 'EDIT_EDGE'
    };
  },
  deleteSelected: () => {
    return {
      type: 'DELETE_SELECTED'
    };
  },
  delete: () => {
    return {
      type: 'DELETE'
    };
  },
  toggleSelect: () => {
    return {
      type: 'TOGGLE_SELECT'
    };
  },
  multiselect: (dragStart, event) => {
    return {
      type: 'MULTISELECT',
      payload: { dragStart: dragStart, event: event }
    };
  },
  filterSelection: param => {
    return {
      type: 'FILTER_SELECTION',
      payload: param
    };
  },
  selectAll: () => {
    return {
      type: 'SELECT_ALL'
    };
  },
  organize: () => {
    return {
      type: 'ORGANIZE'
    };
  },
  playOrPause: () => {
    return {
      type: 'PLAY_OR_PAUSE'
    };
  },
  stop: () => {
    return {
      type: 'STOP'
    };
  },
  setMasterVolume: param => {
    return {
      type: 'SET_MASTER_VOLUME',
      payload: param
    };
  },
  setTempo: param => {
    return {
      type: 'SET_TEMPO',
      payload: param
    };
  },
  setLowPassFilterFrequency: param => {
    return {
      type: 'SET_LP_FILTER_FREQUENCY',
      payload: param
    };
  },
  setLowPassFilterQ: param => {
    return {
      type: 'SET_LP_FILTER_Q',
      payload: param
    };
  },
  setHighPassFilterFrequency: param => {
    return {
      type: 'SET_HP_FILTER_FREQUENCY',
      payload: param
    };
  },
  setHighPassFilterQ: param => {
    return {
      type: 'SET_HP_FILTER_Q',
      payload: param
    };
  },
  setBeatIndex: param => {
    return {
      type: 'SET_BEAT_INDEX',
      payload: param
    };
  }
};