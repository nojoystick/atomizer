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
    }
  }
};
