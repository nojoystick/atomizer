import { volumeBounds, midiBounds } from '../../constants/audio-data';

const VolumeData = audioNode => {
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
      key: audioNode.intensity
    }
  ];
};

export { VolumeData };
