const defaultAudioData = {
  volume: 0.3,
  intensity: 100,
  mode: 'I',
  octave: 4,
  pan: 0.0,
  waveforms: ['sine'],
  attack: 0,
  decay: 0,
  sustain: 0,
  release: 0,
  hpFilterFrequency: 0,
  lpFilterFrequency: 20000,
  hpFilterQ: 0,
  lpFilterQ: 0,
  mute: false,
  solo: 0,
  automationEnabled: {},
  volumeAutomation: [1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1],
  panAutomation: [0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
  hpFilterFrequencyAutomation: [0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
  hpFilterQAutomation: [0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
  lpFilterFrequencyAutomation: [19999, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 19999],
  lpFilterQAutomation: [0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0]
};

const tempoBounds = {
  min: 6,
  max: 250
};

const volumeBounds = {
  min: 0,
  max: 127,
  valueConversion: 127
};

const midiBounds = {
  min: 0,
  max: 127
};

const panBounds = {
  min: -127,
  max: 127,
  valueConversion: 127
};

const envelopeBounds = {
  min: 0.0,
  max: 2.0
};

const filterBounds = {
  frequency: {
    min: 0,
    max: 20000
  },
  q: {
    min: 0,
    max: 50
  }
};

export default defaultAudioData;
export { tempoBounds, volumeBounds, midiBounds, panBounds, envelopeBounds, filterBounds };
