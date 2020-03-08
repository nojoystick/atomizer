const SubPanelData = 
[
  {
    title: 'main',
    sliderFields: [
      {
        label: 'volume',
      },
      {
        label: 'gain',
      }
    ],
    toggleFields: [
      {
        label: 'boost'
      },
      {
        label: 'limit'
      },      
      {
        label: 'sync'
      }
    ]
  },
  {
    title: 'delay',
    sliderFields: [
      {
        label: 'speed'
      },
      {
        label: 'repeats'
      },
      {
        label: 'mix'
      }
    ],
    toggleFields: [
      {
        label: 'radio'
      },
      {
        label: 'ping'
      },
      {
        label: 'duplet'
      },
      {
        label: 'triplet'
      },     
      {
        label: 'chorus'
      }
    ]
  },
  {
    title: 'chaos',
    sliderFields: [
      {
        label: 'amount'
      }
    ],
    toggleFields: [
      {
        label: 'entropy'
      },
      {
        label: 'spiral'
      },
      {
        label: 'chain'
      }
    ]
  }
];

export default SubPanelData;