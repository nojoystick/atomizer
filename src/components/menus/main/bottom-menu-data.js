import { networkActions } from '../../../redux/actions';
import { useSelector } from 'react-redux';
const useSubPanelData = () => {
  const { lpFilterFrequency, lpFilterQ, hpFilterFrequency, hpFilterQ } = useSelector(state => state.network.audio);
  return [
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
      ]
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
      toggleFields: []
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
          value: hpFilterFrequency,
          label: 'high pass freq',
          action: networkActions.setHighPassFilterFrequency
        },
        {
          value: hpFilterQ,
          label: 'high pass res',
          action: networkActions.setHighPassFilterQ
        },
        {
          value: lpFilterFrequency,
          label: 'low pass freq',
          action: networkActions.setLowPassFilterFrequency
        },
        {
          value: lpFilterQ,
          label: 'low pass res',
          action: networkActions.setLowPassFilterQ
        }
      ],
      toggleFields: []
    }
  ];
};

export { useSubPanelData };
