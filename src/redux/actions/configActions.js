export const configActions = {
  setModal: (component, func, glob) => {
    return {
      type: 'SET_MODAL',
      payload: { component: component, func: func, global: glob }
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
  },
  setItemToUpdate: (param, value) => {
    return {
      type: 'SET_ITEM_TO_UPDATE',
      payload: param,
      value: value
    };
  }
};
