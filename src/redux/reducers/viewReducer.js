const defaultState = {
  textVisible: false,
  menuVisible: false,
  sideMenuVisible: false,
  nodeDetailVisible: false,
  modalVisible: false
};

const viewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_TEXT_VISIBLE':
      return (state = { ...state, textVisible: !state.textVisible });
    case 'TOGGLE_MENU_VISIBLE':
      return (state = { ...state, menuVisible: !state.menuVisible });
    case 'TOGGLE_SIDE_MENU_VISIBLE':
      return (state = { ...state, sideMenuVisible: !state.sideMenuVisible });
    case 'TOGGLE_NODE_DETAIL_VISIBLE':
      return (state = { ...state, nodeDetailVisible: !state.nodeDetailVisible });
    case 'CLOSE_ALL':
      return (state = defaultState);
    case 'CLOSE_ALL_OTHERS':
      Object.keys(state).forEach(set => {
        if (set !== action.payload) {
          state[set](false);
        }
      });
      return state;
    default:
      return state;
  }
};

export default viewReducer;
