import elements from './elements';
import utils from '../utils/network-utils';

const networkStateConstants = {
  NODE: {
    key: 'node',
    label: 'add node',
    action: utils.addNode,
    sticky: false,
  },
  ADD_EDGES: {
    key: 'addEdges',
    label: 'add edges',
    action: utils.addEdge,
    sticky: true,
  },
  EDIT_EDGES: {
    key: 'editEdge',
    label: 'edit edge',
    action: utils.editEdge,
    sticky: true
  },
  DELETE: {
    key: 'delete',
    label: 'delete selected',
    action: utils.deleteSelected,
    sticky: false,
  },
  MULTISELECT: {
    key: 'multiselect',
    label: 'select multiple',
    action: null,
    sticky: true
  },
  SELECT_ALL: {
    key: 'select all',
    label: 'select all',
    action: utils.selectAll,
    sticky: false
  },
  ORGANIZE: {
    key: 'organize',
    label: 'organize',
    action: utils.organize,
    sticky: false
  }
}


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
        color: "darkGray",
        hover: "gray"
      },
      width: 1.5,
      selectionWidth: 1,
      hoverWidth: 0.5,
      length: 200,
      smooth: false
    },
    physics: {
      barnesHut: {
        avoidOverlap: 0.5,
        centralGravity: 0.1
      },
      stabilization: false,
    },
    nodes: {
      shape: 'circle',
      borderWidth: 1.5,
      color: {
        border: 'black',
        background: 'whitesmoke',
        highlight: {
          border: 'black',
          background: 'white',
        },
        hover: {
          border: 'black',
          background: 'white',
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
      hierarchical: false,
    },
    width: (0.9 * window.innerWidth).toString(),
    height: (0.8 * window.innerHeight).toString()
  },
  defaultData: {
    nodes: [elements[0]],
    edges: 
    [
    ]
  },
}


export { networkStateConstants, config }