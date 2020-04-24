import { volumeBounds, midiBounds, panBounds } from '../../../constants/audio-data';

const NodeDetailData = audioNode => {
  return [
    {
      label: 'volume',
      onChange: audioNode.setVolume.bind(audioNode),
      min: volumeBounds.min,
      max: volumeBounds.max,
      decimals: 2,
      defaultValue: audioNode.volume,
      defaultValueConversion: 127,
      globalValue: false,
      key: audioNode.volume
    },
    {
      label: 'intensity',
      onChange: audioNode.setIntensity.bind(audioNode),
      min: midiBounds.min,
      max: midiBounds.max,
      decimals: 0,
      defaultValue: audioNode.intensity,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.intensity - 500
    },
    {
      label: 'pan',
      onChange: audioNode.setPan.bind(audioNode),
      min: panBounds.min,
      max: panBounds.max,
      decimals: 2,
      defaultValue: audioNode.pan,
      defaultValueConversion: 127,
      globalValue: false,
      key: audioNode.pan + 500
    }
  ];
};

export default NodeDetailData;
