import elements from '../constants/elements';

export default class utils {
  /**
   * TODO: doc props object...
   */

  static addNode = (props) => {
    const { event, graphInfo, setGraphInfo, elementIndex, setElementIndex} = props;
    const id = elementIndex;
    const nodesCopy = graphInfo.nodes.slice();
    const x = event.pointer ? event.pointer.canvas.x : (elementIndex%2) ? 30: -30;
    const y = event.pointer ? event.pointer.canvas.y : (elementIndex%3) ? 30: -30;
    nodesCopy.push({...elements[elementIndex], x: x, y: y});
    const edgesCopy = graphInfo.edges.slice();
    if( event.nodes && event.nodes.length ) {
      edgesCopy.push({from: event.nodes[0], to: id});
    }
    setGraphInfo({nodes: nodesCopy, edges: edgesCopy});
    if(setElementIndex){
      setElementIndex(elementIndex+1);
    }
  }

  // static addNode = (props) => {
  //   const { options, network, elementIndex, setElementIndex} = props;
  //   const opt = { 
  //     ...options,
  //     manipulation: {
  //       ...options.manipulation,
  //       addNode: function(nodeData, callback) {
  //         nodeData = elements[elementIndex];
  //         callback(nodeData);
  //         network.addNodeMode();
  //         setElementIndex(elementIndex+1);
  //       }
  //     }
  //   };
  //   network.setOptions(opt);
  //   network.addNodeMode();
  // }

  static addEdge = (props) => {
    const { options, network } = props;
    const opt = { 
      ...options,
      manipulation: {
        ...options.manipulation,
        addEdge: function(nodeData, callback) {
          if(nodeData.from !== nodeData.to){
            callback(nodeData);
            network.addEdgeMode();
          }
        }
      }
    };
    network.setOptions(opt);
    network.addEdgeMode();
  }

  static editEdge = (props) => {
    const { network } = props;
    network.editEdgeMode();
  }

  static deleteSelected = (props) => {
    const {selectedNodes, network, setModalInfo} = props;
    const selected = selectedNodes ? selectedNodes: network.getSelectedNodes();
    props.selected = selected;
    if(selected.length > 5){
      setModalInfo({
        show: true,
        numItems: selected.length, 
        props: props,
        func: this.doDeletion
      });
    }
    else {
      this.doDeletion(props);
    }
  }

  static doDeletion = (props) => {
    const {selected, setSelectedNodes, graphInfo, setGraphInfo, network, setNetwork} = props;
    network.deleteSelected();
    for(var i = graphInfo.nodes.length-1; i >=0; i--){
      if(selected.includes(graphInfo.nodes[i].id)){
        graphInfo.nodes.splice(i, 1);
      }
    }
    setGraphInfo(graphInfo);
    setNetwork(network);
    setSelectedNodes(null);
  }

  static multiSelect = (dragStart, props) => {
    const {event, graphInfo, network} = props;
    const positionMap = {nodes: [], positions: {}};
    graphInfo.nodes.forEach(node => {
      positionMap.nodes.push(node.id);
    })
    positionMap.positions = network.getPositions(positionMap.nodes);
    const selectedNodes = [];
    positionMap.nodes.forEach(node => {
      if(this.inBounds(positionMap.positions[node], dragStart.canvas, event.pointer.canvas)){
        selectedNodes.push(node);
      }
    })
    const nodes = dragStart.ctrl ? network.getSelectedNodes().concat(selectedNodes) : selectedNodes; 
    this.filterSelection(nodes, props);
  }

  static selectAll = (props) => {
    const {graphInfo, network, setSelectedNodes} = props;
    const nodes = [];
    graphInfo.nodes.forEach(node => {
      nodes.push(node.id);
    });

    if(nodes.filter(id => id!==0).sort().join(',')=== network.getSelectedNodes().sort().join(',')){
      network.unselectAll();
      setSelectedNodes(null);
    }
    else {
      this.filterSelection(nodes, props);
    }
  }

  static filterSelection = (nodes, props) => {
    const {network, setSelectedNodes} = props;
    if(nodes === null){
      setSelectedNodes(null);
      network.unselectAll();
    }
    else {
      const filteredNodes = nodes.filter(id => id!==0);
      setSelectedNodes(filteredNodes);
      network.setSelection({nodes: filteredNodes});
    }
  }

  static organize = (props) => {
    const {network, options} = props;
    const opt = options.layout.hierarchical ?  {...options, layout: { hierarchical: false }} : {...options, layout: { hierarchical: true }};
    network.setOptions(opt);
  }

  static fit = (props) => {
    return null;
  }
  static setMove = (x, y, scale) => {
    return {
      scale: scale,
      offset: {x: -x, y: -y},
      animation: {
        duration: 500,
        easingFunction: 'linear'
      }
    }
  }

  /**
   * determine if a given position is between the bounds of a start and end point.
   * 
   * @param {} position 
   * @param {*} start 
   * @param {*} end 
   */
  static  inBounds = (position, start, end) => {
    return position && start && end && inBoundsOneAxis(position.x, start.x, end.x) && inBoundsOneAxis(position.y, start.y, end.y);
  }
}

/****************************
 * private helpers
 ***************************/

const inBoundsOneAxis = (position, start, end) => {
  return ((position < start && position > end) || (position > start && position < end));
}