export const viewActions = {
  setTextVisible: (param, screenSize) => {
    return {
      type: 'SET_TEXT_VISIBLE',
      payload: param,
      screenSize: screenSize
    };
  },
  setMenuVisible: (param, screenSize) => {
    return {
      type: 'SET_MENU_VISIBLE',
      payload: param,
      screenSize: screenSize
    };
  },
  setSideMenuVisible: (param, screenSize) => {
    return {
      type: 'SET_SIDE_MENU_VISIBLE',
      payload: param,
      screenSize: screenSize
    };
  },
  setNodeDetailVisible: (param, screenSize) => {
    return {
      type: 'SET_NODE_DETAIL_VISIBLE',
      payload: param,
      screenSize: screenSize
    };
  },
  closeAll: () => {
    return {
      type: 'CLOSE_ALL'
    };
  },
  closeAllOthers: param => {
    return {
      type: 'CLOSE_ALL_OTHERS',
      payload: param
    };
  }
};
