import { volumeBounds, tempoBounds } from '../../../constants/audio-data';
import { networkActions } from '../../../redux/actions';

const PlayerData = [
  {
    label: 'volume',
    min: volumeBounds.min,
    max: volumeBounds.max,
    decimals: 2,
    defaultValue: 'masterGain',
    defaultValueConversion: 127,
    onChange: networkActions.setMasterVolume,
    globalValue: true
  },
  {
    label: 'tempo',
    min: tempoBounds.min,
    max: tempoBounds.max,
    decimals: 0,
    defaultValue: 'masterTempo',
    defaultValueConversion: 1,
    onChange: networkActions.setTempo,
    globalValue: true
  }
];

export default PlayerData;
