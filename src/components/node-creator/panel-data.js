import { volumeBounds, midiBounds, panBounds, envelopeBounds, filterBounds } from '../../constants/audio-data';
import _ from 'lodash';

const VolumeData = audioNode => {
  return [
    {
      label: 'volume',
      onChange: _.throttle(audioNode.setVolume.bind(audioNode), 500),
      min: volumeBounds.min,
      max: volumeBounds.max,
      decimals: 2,
      defaultValue: audioNode.volume,
      defaultValueConversion: 127,
      globalValue: false,
      key: audioNode.volume,
      stepInput: 0.01
    },
    {
      label: 'intensity',
      onChange: _.throttle(audioNode.setIntensity.bind(audioNode), 500),
      min: midiBounds.min,
      max: midiBounds.max,
      decimals: 0,
      defaultValue: audioNode.intensity,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.intensity,
      stepInput: 1
    },
    {
      label: 'pan',
      onChange: _.throttle(audioNode.setPan.bind(audioNode), 500),
      min: panBounds.min,
      max: panBounds.max,
      decimals: 2,
      defaultValue: audioNode.pan,
      defaultValueConversion: 127,
      globalValue: false,
      key: audioNode.pan,
      stepInput: 0.01
    }
  ];
};

const EnvelopeData = audioNode => {
  return [
    {
      label: 'attack',
      onChange: audioNode.setAttack.bind(audioNode),
      min: envelopeBounds.min,
      max: envelopeBounds.max,
      decimals: 2,
      defaultValue: audioNode.attack,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.attack + 10,
      step: 0.01,
      stepInput: 0.01,
      vertical: true
    },
    {
      label: 'decay',
      onChange: audioNode.setDecay.bind(audioNode),
      min: envelopeBounds.min,
      max: envelopeBounds.max,
      decimals: 2,
      defaultValue: audioNode.decay,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.decay + 20,
      step: 0.01,
      stepInput: 0.01,
      vertical: true
    },
    {
      label: 'sustain',
      onChange: audioNode.setSustain.bind(audioNode),
      min: envelopeBounds.min,
      max: envelopeBounds.max,
      decimals: 2,
      defaultValue: audioNode.sustain,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.sustain + 30,
      step: 0.01,
      stepInput: 0.01,
      vertical: true
    },
    {
      label: 'release',
      onChange: audioNode.setRelease.bind(audioNode),
      min: envelopeBounds.min,
      max: envelopeBounds.max,
      decimals: 2,
      defaultValue: audioNode.release,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.release + 40,
      step: 0.01,
      stepInput: 0.01,
      vertical: true
    }
  ];
};

const HPFilterData = audioNode => {
  return [
    {
      label: 'frequency',
      onChange: audioNode.setHPFilterFrequency.bind(audioNode),
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      decimals: 0,
      defaultValue: audioNode.hpFilterFrequency,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.hpFilterFrequency + 1000,
      step: 1,
      stepInput: 1
    },
    {
      label: 'q',
      onChange: audioNode.setHPFilterQ.bind(audioNode),
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      decimals: 0,
      defaultValue: audioNode.hpFilterQ,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.hpFilterQ + 100,
      step: 1,
      stepInput: 1
    }
  ];
};

const LPFilterData = audioNode => {
  return [
    {
      label: 'frequency',
      onChange: audioNode.setLPFilterFrequency.bind(audioNode),
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      decimals: 0,
      defaultValue: audioNode.lpFilterFrequency,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.lpFilterFrequency + 2000,
      step: 1,
      stepInput: 1
    },
    {
      label: 'q',
      onChange: audioNode.setLPFilterQ.bind(audioNode),
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      decimals: 0,
      defaultValue: audioNode.lpFilterQ,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.lpFilterQ + 1000,
      step: 1,
      stepInput: 1
    }
  ];
};

export { VolumeData, EnvelopeData, HPFilterData, LPFilterData };
