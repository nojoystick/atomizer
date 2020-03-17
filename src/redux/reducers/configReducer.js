const defaultState = {
  modal: {
    header: null,
    message: null,
    func: null
  }
};

const configReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      state = { ...state, modal: { header: action.payload.header, message: action.payload.message, func: action.payload.func } };
      return state;
    default:
      return state;
  }
};

export default configReducer;
