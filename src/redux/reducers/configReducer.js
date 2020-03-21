const defaultState = {
  modal: {
    header: null,
    message: null,
    func: null
  },
  hotkeys: true
};

const configReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      state = { ...state, modal: { header: action.payload.header, message: action.payload.message, func: action.payload.func } };
      return state;
    case 'SET_HOTKEYS':
      return (state = { ...state, hotkeys: action.payload });
    default:
      return state;
  }
};

export default configReducer;
