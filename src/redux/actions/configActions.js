export const configActions = {
  setModal: (component, func) => {
    return {
      type: 'SET_MODAL',
      payload: { component: component, func: func }
    };
  },
  setHotkeys: param => {
    return {
      type: 'SET_HOTKEYS',
      payload: param
    };
  },
  setUser: param => {
    return {
      type: 'SET_USER',
      payload: param
    };
  },
  setLogin: param => {
    return {
      type: 'SET_LOGIN',
      payload: param
    };
  },
  setFormFields: (username, email) => {
    return {
      type: 'SET_FORM_FIELDS',
      username: username,
      email: email
    };
  }
};
