export const viewActions = {
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
  setNodeDetailVisible: param => {
    return {
      type: 'SET_NODE_DETAIL_VISIBLE',
      payload: param
    };
  },
  setScreenDimensions: (width, height) => {
    return {
      type: 'SET_SCREEN_DIMENSIONS',
      payload: { width: width, height: height }
    };
  },
  closeAll: () => {
    return {
      type: 'CLOSE_ALL'
    };
  }
};
