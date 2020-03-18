import { networkActions, viewActions } from '../redux/actions';

const sideMenuData = {
  INTERACT: [
    {
      label: 'add node',
      action: networkActions.addNodeFromMenu
    },
    {
      label: 'select all',
      action: networkActions.selectAll
    },
    {
      label: 'delete selected',
      action: networkActions.deleteSelected
    },
    {
      label: 'edit edge',
      action: networkActions.editEdge
    }
  ],
  MODE: [
    {
      label: 'pointer',
      action: networkActions.defaultMode
    },
    {
      label: 'multiselect',
      action: networkActions.toggleSelect
    },
    {
      label: 'add edges',
      action: networkActions.addEdge
    }
  ],
  VIEW: [
    {
      label: 'organize',
      action: networkActions.organize
    },
    {
      label: 'fit',
      action: viewActions.closeAll
    }
  ]
};

export { sideMenuData };
