import { networkActions, viewActions } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import IconSet from '../../../constants/icon-set';

const useSideMenuData = () => {
  const defaultState = useSelector(state => state.network.defaultState);
  const addEdgeState = useSelector(state => state.network.addEdgeState);
  const multiSelectState = useSelector(state => state.network.multiSelectState);
  const organizeState = useSelector(state => state.network.organizeState);
  return {
    INTERACT: [
      {
        label: 'add node',
        action: networkActions.addNodeFromMenu,
        icon: {
          path: IconSet.addNode,
          viewBox: '0 0 510 510'
        },
        shortcut: 'a'
      },
      {
        label: 'select all',
        action: networkActions.selectAll,
        icon: {
          path: IconSet.selectAll,
          viewBox: '0 0 30 30'
        },
        shortcut: 's'
      },
      {
        label: 'delete selected',
        action: networkActions.deleteSelected,
        icon: {
          path: IconSet.delete,
          viewBox: '0 0 50 50'
        },
        shortcut: 'd'
      },
      {
        label: 'edit edge',
        action: networkActions.editEdge,
        icon: {
          path: IconSet.editEdge,
          viewBox: '0 0 510 510'
        },
        shortcut: 'f'
      }
    ],
    MODE: [
      {
        active: defaultState,
        label: 'pointer',
        action: networkActions.defaultMode,
        icon: {
          path: IconSet.pointer,
          viewBox: '0 0 25 25'
        },
        shortcut: 'q'
      },
      {
        active: multiSelectState,
        label: 'multiselect',
        action: networkActions.toggleSelect,
        icon: {
          path: IconSet.selectMultiple, // edit edge
          viewBox: '0 0 500 500'
        },
        shortcut: 'w'
      },
      {
        active: addEdgeState,
        label: 'add edges',
        action: networkActions.addEdge,
        icon: {
          path: IconSet.addEdge,
          viewBox: '0 0 510 510'
        },
        shortcut: 'e'
      }
    ],
    VIEW: [
      {
        active: organizeState,
        label: 'organize',
        action: networkActions.organize,
        icon: {
          path: IconSet.organize,
          viewBox: '0 0 510 510'
        },
        shortcut: 'z'
      },
      {
        label: 'fit',
        action: viewActions.closeAll,
        icon: {
          path: IconSet.fit,
          viewBox: '0 0 68 68'
        },
        shortcut: 'x'
      }
    ],
    FILE: [
      {
        label: 'save network',
        action: networkActions.saveNetwork,
        icon: {
          path: IconSet.save,
          viewBox: '0 0 600 600'
        },
        shortcut: ''
      },
      {
        label: 'load network',
        action: networkActions.loadNetwork,
        icon: {
          path: IconSet.load,
          viewBox: '0 0 50 50'
        },
        shortcut: ''
      },
      {
        label: 'new network',
        action: networkActions.newNetwork,
        icon: {
          path: IconSet.newFile,
          viewBox: '0 0 50 50'
        },
        shortcut: ''
      }
    ]
  };
};

const nodeEditorData = {
  label: 'send to node editor',
  action: networkActions.sendToLab,
  icon: IconSet.edit,
  viewBox: '0 0 30 30',
  shortcut: ''
};

export default useSideMenuData;

export { nodeEditorData };
