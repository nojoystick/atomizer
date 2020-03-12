import elements from '../constants/elements';
import { config } from '../constants/network-constants';

export default class utils {
  /**
   * TODO: doc props object...
   */

  static addNode = (props) => {
    const { event, graphInfo, setGraphInfo, elementIndex, setElementIndex} = props;
    const id = graphInfo.nodes.length;
    var nodesCopy = graphInfo.nodes.slice(); // this will create a copy with the same items
    nodesCopy.push({...elements[elementIndex], x: (elementIndex%2) ? 30: -30, y:(elementIndex%3) ? 30: -30});
    var edgesCopy = graphInfo.edges.slice();
    if(event.nodes && event.nodes[0]) {
      edgesCopy.push({from: event.nodes[0], to: id})
    }
    const newGraphInfo = ({nodes: nodesCopy, edges: edgesCopy})
    if(setGraphInfo){
      setGraphInfo(newGraphInfo);
    }
    else return newGraphInfo;
    if(!event.nodes || !event.nodes.length) {
      this.addEdge(props);
    }
    if(setElementIndex){
      setElementIndex(elementIndex+1);
    }
  }

  static addEdge = (props) => {
    const { options, network, setNetwork } = props;
    const opt = { 
      ...options,
      manipulation: {
        ...options.manipulation,
        addEdge: function(nodeData, callback) {
          callback(nodeData);
          network.addEdgeMode();
        }
      }
    };
    network.setOptions(opt);
    network.addEdgeMode();
    setNetwork(network)
    //setOptions(opt);
  }

  static editEdge = (props) => {
    const { network, setNetwork } = props;
    network.editEdgeMode();
    if(setNetwork){
      setNetwork(network)
    }
  }

  static deleteSelected = (props) => {
    const { graphInfo, setGraphInfo, network, setNetwork } = props;
    const selected = network.getSelectedNodes();
    if(selected.length > 5){
    }
    this.doDeletion(selected, graphInfo, setGraphInfo, network, setNetwork);
  }

  static doDeletion = (selected, graphInfo, setGraphInfo, network, setNetwork) => {
    network.deleteSelected();

    for(var i = graphInfo.nodes.length-1; i >=0; i--){
      if(selected.includes(graphInfo.nodes[i].id)){
        graphInfo.nodes.splice(i, 1);
      }
    }
    setGraphInfo(graphInfo);
    setNetwork(network);
  }

  static multiSelect = (dragStart, props) => {
    const {event, graphInfo, network, setNetwork} = props;
    const positionMap = {nodes: [], positions: {}};
    graphInfo.nodes.forEach(node => {
      positionMap.nodes.push(node.id);
    })
    positionMap.positions = network.getPositions(positionMap.nodes);
    const selectedNodes = [];
    positionMap.nodes.forEach(node => {
      if(inBounds(positionMap.positions[node], dragStart.canvas, event.pointer.canvas)){
        selectedNodes.push(node);
      }
    })
    dragStart.ctrl ? network.selectNodes(network.getSelectedNodes().concat(selectedNodes)) : network.selectNodes(selectedNodes); 
    setNetwork(network);
  }

  static selectAll = (props) => {
    const {graphInfo, network, setNetwork} = props;
    const nodes = [];
    graphInfo.nodes.forEach(node => {
      nodes.push(node.id);
    });

    if(nodes.sort().join(',')=== network.getSelectedNodes().sort().join(',')){
      network.unselectAll();
    }
    else {
      network.selectNodes(nodes);
    }
    if(setNetwork){
      setNetwork(network);
    }
  }

  static organize = (props) => {
    const {options, setOptions} = props;
    let opt = options.layout.hierarchical ? config.options : {...options, layout: { hierarchical: true }};
    if(opt.edges && (opt.edges.smooth || opt.edges.forceDirection)){
      console.log('options corrupted! this bug never dies!');
      opt = config.options;
    } 
    setOptions(opt);
  }
}

/****************************
 * private helpers
 ***************************/

/**
 * determine if a given position is between the bounds of a start and end point.
 * 
 * @param {} position 
 * @param {*} start 
 * @param {*} end 
 */

const inBounds = (position, start, end) => {
  return position && start && end && inBoundsOneAxis(position.x, start.x, end.x) && inBoundsOneAxis(position.y, start.y, end.y);
}

const inBoundsOneAxis = (position, start, end) => {
  return ((position < start && position > end) || (position > start && position < end));
}