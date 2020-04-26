const defaultState = {
  menuVisible: false,
  sideMenuVisible: false,
  labVisible: false,
  modalVisible: false,
  screenInfo: {
    breakpoint: 600,
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 600
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
    case 'SET_LAB_VISIBLE':
      closeOthers(state, action, 'labVisible');
      return (state = { ...state, labVisible: action.payload });
    case 'SET_SCREEN_DIMENSIONS':
      return (state = {
        ...state,
        screenInfo: {
          ...state.screenInfo,
          width: action.payload.width,
          height: action.payload.height,
          isMobile: action.payload.width < state.screenInfo.breakpoint
        }
      });
    case 'CLOSE_ALL':
      return (state = defaultState);
    default:
      return state;
  }
};
const closeOthers = (state, action, keepOpen) => {
  if (state.screenInfo.isMobile && action.payload) {
    Object.keys(state).forEach(key => {
      if (key !== keepOpen && key !== 'screenInfo') {
        state[key] = false;
      }
    });
  }
};

export default viewReducer;
