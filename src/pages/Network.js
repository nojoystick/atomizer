import React from 'react';
import Graph from "react-graph-vis";
import '../stylesheets/Network.scss'

const Network= () => {

  const graphInfo = {
    nodes:
      [
      { id: 1, label: `<b>H</b>`, title: "Hydrogen" },
      { id: 2, label: `<b>He</b>`, title: "Helium" },
      { id: 3, label: `<b>Li</b>`, title: "Lithium" },
      { id: 4, label: `<b>Be</b>`, title: "Beryllium" },
      { id: 5, label: `<b>B</b>`, title: "Boron" }
      ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };

  const options = {
    interaction: {
      hover: true,
      dragView: false,
      zoomView: true
    },
    physics: {
      barnesHut: {
        avoidOverlap: 0.5,
        centralGravity: 0.6
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
      
    },
    edges: {
      color: {
        color: "darkGray",
        hover: "gray"
      },
      width: 1.5,
      selectionWidth: 1,
      hoverWidth: 0.5,
      length: 200
    },
    width: (0.9 * window.innerWidth).toString(),
    height: (0.8 * window.innerHeight).toString()
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };

  return (
    <>
      <Graph 
        graph={graphInfo}
        options={options}
        events={events}
      />
    </>
  )
}

export default Network;