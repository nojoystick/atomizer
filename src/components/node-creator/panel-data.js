import { volumeBounds, panBounds, envelopeBounds, filterBounds } from '../../constants/audio-data';
import _ from 'lodash';

const VolumeData = audioNode => {
  if (!audioNode || !audioNode.volume) {
    return {};
  }
  return [
    {
      label: 'volume',
      onChange: _.throttle(audioNode.setVolume.bind(audioNode), 500),
      disabled: audioNode.automationEnabled.volumeAutomation,
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
      label: 'pan',
      disabled: audioNode.automationEnabled.panAutomation,
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
  if (!audioNode || !audioNode.volume) {
    return {};
  }
  return [
    {
      label: 'attack',
      onChange: _.throttle(audioNode.setAttack.bind(audioNode), 300),
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
      onChange: _.throttle(audioNode.setDecay.bind(audioNode), 300),
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
      onChange: _.throttle(audioNode.setSustain.bind(audioNode), 300),
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
      onChange: _.throttle(audioNode.setRelease.bind(audioNode), 300),
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
  if (!audioNode || !audioNode.volume) {
    return {};
  }
  return [
    {
      label: 'frequency',
      disabled: audioNode.automationEnabled.hpFilterFrequencyAutomation,
      onChange: _.throttle(audioNode.setHPFilterFrequency.bind(audioNode), 300),
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      decimals: 0,
      defaultValue: audioNode.hpFilterFrequency,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.hpFilterFrequency ? audioNode.hpFilterFrequency + 100 : -100,
      step: 1,
      stepInput: 1
    },
    {
      label: 'q',
      disabled: audioNode.automationEnabled.hpFilterQAutomation,
      onChange: _.throttle(audioNode.setHPFilterQ.bind(audioNode), 300),
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      decimals: 0,
      defaultValue: audioNode.hpFilterQ,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.hpFilterQ ? audioNode.hpFilterQ + 20101 : -200,
      step: 1,
      stepInput: 1
    }
  ];
};

const LPFilterData = audioNode => {
  if (!audioNode || !audioNode.volume) {
    return {};
  }
  return [
    {
      label: 'frequency',
      disabled: audioNode.automationEnabled.lpFilterFrequencyAutomation,
      onChange: _.throttle(audioNode.setLPFilterFrequency.bind(audioNode), 300),
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      decimals: 0,
      defaultValue: audioNode.lpFilterFrequency,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.lpFilterFrequency ? -1 * audioNode.lpFilterFrequency : -300,
      step: 1,
      stepInput: 1
    },
    {
      label: 'q',
      disabled: audioNode.automationEnabled.lpFilterQAutomation,
      onChange: _.throttle(audioNode.setLPFilterQ.bind(audioNode), 300),
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      decimals: 0,
      defaultValue: audioNode.lpFilterQ,
      defaultValueConversion: 1,
      globalValue: false,
      key: audioNode.lpFilterQ ? -1 * audioNode.lpFilterQ - 20001 : -400,
      step: 1,
      stepInput: 1
    }
  ];
};

export { VolumeData, EnvelopeData, HPFilterData, LPFilterData };
