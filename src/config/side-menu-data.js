import { networkActions, viewActions } from '../redux/actions';
import { useSelector } from 'react-redux';

const useSideMenuData = () => {
  const { defaultState, addEdgeState, multiSelectState, organizeState } = useSelector(state => state.network);
  return {
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
        active: defaultState,
        label: 'pointer',
        action: networkActions.defaultMode
      },
      {
        active: multiSelectState,
        label: 'multiselect',
        action: networkActions.toggleSelect
      },
      {
        active: addEdgeState,
        label: 'add edges',
        action: networkActions.addEdge
      }
    ],
    VIEW: [
      {
        active: organizeState,
        label: 'organize',
        action: networkActions.organize
      },
      {
        label: 'fit',
        action: viewActions.closeAll
      }
    ]
  };
};

export { useSideMenuData };
