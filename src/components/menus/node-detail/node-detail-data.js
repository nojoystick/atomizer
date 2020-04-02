import { volumeBounds } from '../../../constants/audio-data';

const NodeDetailData = audioNode => [
  {
    label: 'volume',
    onChange: audioNode.setVolume,
    min: volumeBounds.min,
    max: volumeBounds.max,
    decimals: 2,
    defaultValue: audioNode.volume,
    defaultValueConversion: 127,
    global: false
  }
];

export default NodeDetailData;
