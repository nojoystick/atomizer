const defaultState = {
  menuVisible: false,
  sideMenuVisible: false,
  nodeDetailVisible: false,
  modalVisible: false,
  screenInfo: {
    breakpoint: 800,
    width: window.innerWidth,
    height: window.innerHeight
  }
};

const viewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MENU_VISIBLE':
      closeOthers(state, action, 'menuVisible');
      return (state = { ...state, menuVisible: action.payload });
    case 'SET_SIDE_MENU_VISIBLE':
      closeOthers(state, action, 'sideMenuVisible');
      return (state = { ...state, sideMenuVisible: action.payload });
    case 'SET_NODE_DETAIL_VISIBLE':
      closeOthers(state, action, 'nodeDetailVisible');
      return (state = { ...state, nodeDetailVisible: action.payload });
    case 'SET_SCREEN_DIMENSIONS':
      return (state = {
        ...state,
        screenInfo: {
          ...state.screenInfo,
          width: action.payload.width,
          height: action.payload.height
        }
      });
    case 'CLOSE_ALL':
      return (state = defaultState);
    default:
      return state;
  }
};
const closeOthers = (state, action, keepOpen) => {
  if (state.screenInfo.width < state.screenInfo.breakpoint && action.payload) {
    Object.keys(state).forEach(key => {
      if (key !== keepOpen && key !== 'screenInfo') {
        state[key] = false;
      }
    });
  }
};

export default viewReducer;
