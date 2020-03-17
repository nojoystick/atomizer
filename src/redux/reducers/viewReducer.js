const defaultState = {
  textVisible: false,
  menuVisible: false,
  sideMenuVisible: false,
  nodeDetailVisible: false,
  modalVisible: false,
  screenBreakpoint: 800
};

const viewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_VISIBLE':
      closeOthers(state, action, 'textVisible');
      return (state = { ...state, textVisible: action.payload });
    case 'SET_MENU_VISIBLE':
      closeOthers(state, action, 'menuVisible');
      return (state = { ...state, menuVisible: action.payload });
    case 'SET_SIDE_MENU_VISIBLE':
      closeOthers(state, action, 'sideMenuVisible');
      return (state = { ...state, sideMenuVisible: action.payload });
    case 'SET_NODE_DETAIL_VISIBLE':
      closeOthers(state, action, 'nodeDetailVisible');
      return (state = { ...state, nodeDetailVisible: action.payload });
    case 'CLOSE_ALL':
      return (state = defaultState);
    default:
      return state;
  }
};
const closeOthers = (state, action, keepOpen) => {
  if (action.screenSize.width < state.screenBreakpoint && action.payload) {
    Object.keys(state).forEach(key => {
      if (key !== keepOpen && key !== 'screenBreakpoint') {
        state[key] = false;
      }
    });
  }
};

export default viewReducer;
