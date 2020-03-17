import elements from './elements';
import { networkActions, viewActions } from '../redux/actions';

const networkStateConstants = {
  INTERACT: [
    {
      label: 'add node',
      action: networkActions.addNodeFromMenu
    },
    {
      label: 'edit edge',
      action: networkActions.editEdge
    },
    {
      label: 'select all',
      action: networkActions.selectAll
    },
    {
      label: 'delete selected',
      action: networkActions.deleteSelected
    }
  ],
  MODE: [
    {
      label: 'pointer',
      action: networkActions.defaultMode
    },
    {
      label: 'add edges',
      action: networkActions.addEdge
    },
    {
      label: 'multiselect',
      action: networkActions.toggleSelect
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

const config = {
  options: {
    interaction: {
      hover: true,
      dragView: true,
      zoomView: true,
      multiselect: true
    },
    edges: {
      color: {
        color: 'darkGray',
        hover: 'gray'
      },
      width: 1.5,
      selectionWidth: 1,
      hoverWidth: 0.5,
      length: 200,
      smooth: false
    },
    physics: {
      enabled: true,
      barnesHut: {
        avoidOverlap: 0.5,
        centralGravity: 0.15
      },
      minVelocity: -1,
      stabilization: {
        enabled: true
      }
    },
    manipulation: {},
    nodes: {
      shape: 'circle',
      borderWidth: 1.5,
      color: {
        border: 'black',
        background: 'whitesmoke',
        highlight: {
          border: 'black',
          background: 'white'
        },
        hover: {
          border: 'black',
          background: 'white'
        }
      },
      font: {
        color: 'black',
        size: 18,
        face: 'inconsolata',
        multi: 'html'
      },
      widthConstraint: 100
    },
    layout: {
      hierarchical: false
    },
    autoResize: false,
    width: window.innerWidth.toString(),
    height: window.innerHeight.toString()
  },
  defaultData: {
    nodes: [elements[0]],
    edges: []
  }
};

export { networkStateConstants, config };
