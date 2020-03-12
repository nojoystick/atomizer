const SubPanelData = 
[
  {
    title: 'lab station',
    subtitle: 'master settings',
    size: 'large',
    sliderFields: [
      {
        label: 'volume',
        hoverText: 'master volume'
      },
      {
        label: 'tempo',
        hoverText: 'master tempo in bpm',
        min: 1,
        max: 300
      },
      {
        label: 'range',
        hoverText: 'octave range expander'
      }
    ],
    toggleFields: [
      {
        label: 'limit',
        hoverText: 'prevent clipping'
      },    
      {
        label: 'sync',
        hoverText: 'lock nodes to master tempo'
      },
      {
        label: 'safety goggles',
        hoverText: 'restict to pentatonic scale'
      }
    ]
  },
  {
    title: '∆t',
    subtitle: 'delay',
    size: 'medium',
    sliderFields: [
      {
        label: 'speed',
        hoverText: 'rate of delay'
      },
      {
        label: 'repeats',
        hoverText: 'number of repeats'
      },
      {
        label: 'mix',
        hoverText: ''
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
      },
      {
        label: 'sync',
        hoverText: 'lock rate to master tempo'
      }
    ]
  },
  {
    title: 'entropy',
    size: 'small',
    sliderFields: [
      {
        label: 'amount'
      }
    ],
    toggleFields: [
      {
        label: 'chaos'
      },
      {
        label: 'spiral'
      }
    ]
  },
  {
    title: 'mass concentration',
    size: 'medium',
    sliderFields: [
      {
        label: 'amount'
      }
    ],
    toggleFields: [
      {
        label: 'chaos'
      },
      {
        label: 'spiral'
      }
    ],
  },
  {
    title: 'spectroscopy',
    subtitle: 'equalizer',
    size: 'medium',
    sliderFields: [
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      }
    ],
    toggleFields: [
    ]
  },
  {
    title: 'kelvin',
    subtitle: 'distortion',
    size: 'small',
    sliderFields: [
      {
        label: 'amount'
      }
    ],
    toggleFields: [
      {
        label: 'bitcrush'
      },
      {
        label: 'swirl'
      },
      {
        label: 'explode'
      }
    ]
  },
  {
    title: 'voltage',
    subtitle: 'filters',
    size: 'large',
    sliderFields: [
      {
        label: 'high pass freq'
      },
      {
        label: 'high pass res'
      },
      {
        label: 'low pass freq'
      },
      {
        label: 'low pass res'
      }
    ],
    toggleFields: [
    ]
  },
];

export default SubPanelData;