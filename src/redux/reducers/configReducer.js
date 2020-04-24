const defaultState = {
  modal: {
    header: null,
    global: null,
    func: null
  },
  login: {
    valid: false,
    message: null
  },
  formFields: {
    username: '',
    email: ''
  },
  hotkeys: true
};

const configReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      state = {
        ...state,
        modal: { component: action.payload.component, func: action.payload.func, global: action.payload.global }
      };
      return state;
    case 'SET_HOTKEYS':
      return { ...state, hotkeys: action.payload };
    case 'SET_LOGIN':
      return { ...state, login: action.payload };
    case 'SET_FORM_FIELDS':
      return {
        ...state,
        formFields: {
          username: action.username ? action.username : state.formFields.username,
          email: action.email ? action.email : state.formFields.email
        }
      };
    default:
      return state;
  }
};

export default configReducer;
