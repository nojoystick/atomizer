export const networkActions = {
  setNetwork: param => {
    return {
      type: 'SET_NETWORK',
      payload: param
    };
  },
  setDataSet: param => {
    return {
      type: 'SET_DATASET',
      payload: param
    };
  },
  setElementIndex: (param, constraint) => {
    return {
      type: 'SET_ELEMENT_INDEX',
      constraint: constraint,
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
  fit: param => {
    return {
      type: 'FIT',
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
  addEdge: param => {
    return {
      type: 'ADD_EDGE',
      dispatch: param
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
  setKey: param => {
    return {
      type: 'SET_KEY',
      payload: param
    };
  },
  setDisposition: param => {
    return {
      type: 'SET_DISPOSITION',
      payload: param
    };
  },
  setMasterVolume: (param, scale) => {
    return {
      type: 'SET_MASTER_VOLUME',
      payload: param,
      scale: scale
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
  saveNetwork: () => {
    return {
      type: 'SAVE_NETWORK'
    };
  },
  loadNetwork: (name, items) => {
    return {
      type: 'LOAD_NETWORK',
      name: name,
      payload: items
    };
  },
  sendToLab: () => {
    return {
      type: 'SEND_TO_LAB'
    };
  },
  newNetwork: () => {
    return {
      type: 'NEW_NETWORK'
    };
  },
  createNodeForElement: param => {
    return {
      type: 'CREATE_NODE_FOR_ELEMENT',
      payload: param
    };
  },
  setSoloed: () => {
    return {
      type: 'SET_SOLOED'
    };
  },
  setMuted: () => {
    return {
      type: 'SET_MUTED'
    };
  },
  isSomethingMutedOrSoloed: () => {
    return {
      type: 'IS_SOMETHING_MUTED_OR_SOLOED'
    };
  },
  shouldUpdateNetwork: () => {
    return {
      type: 'SHOULD_UPDATE_NETWORK'
    };
  },
  setShouldSaveNetwork: param => {
    return {
      type: 'SET_SHOULD_SAVE_NETWORK',
      payload: param
    };
  },
  copyNodeFromIndex: param => {
    return {
      type: 'COPY_NODE_FROM_INDEX',
      payload: param
    };
  }
};
