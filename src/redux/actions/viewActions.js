export const viewActions = {
  toggleTextVisible: () => {
    return {
      type: 'TOGGLE_TEXT_VISIBLE'
    };
  },
  toggleMenuVisible: () => {
    return {
      type: 'TOGGLE_MENU_VISIBLE'
    };
  },
  toggleSideMenuVisible: () => {
    return {
      type: 'TOGGLE_SIDE_MENU_VISIBLE'
    };
  },
  toggleNodeDetailVisible: () => {
    return {
      type: 'TOGGLE_NODE_DETAIL_VISIBLE'
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
