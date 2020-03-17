export const configActions = {
  setModal: (header, message, func) => {
    return {
      type: 'SET_MODAL',
      payload: { header: header, message: message, func: func }
    };
  }
};
