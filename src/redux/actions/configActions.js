export const configActions = {
  setModal: (header, message, func) => {
    return {
      type: 'SET_MODAL',
      payload: { header: header, message: message, func: func }
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
