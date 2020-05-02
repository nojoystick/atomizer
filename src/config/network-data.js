const networkData = {
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
      arrowStrikethrough: false,
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
        centralGravity: 0.1
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
      hierarchical: {
        enabled: false,
        sortMethod: 'hubsize'
      }
    },
    autoResize: false,
    width: window.innerWidth > 500 ? '3000px' : window.innerWidth + 'px',
    height: window.innerWidth > 500 ? '2000px' : window.innerHeight + 'px'
  },
  defaultData: {
    nodes: [],
    edges: []
  }
};

export { networkData };
