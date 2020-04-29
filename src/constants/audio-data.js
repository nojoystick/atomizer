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
  solo: 0
};

const tempoBounds = {
  min: 6,
  max: 400
};

const volumeBounds = {
  min: 0,
  max: 127
};

const midiBounds = {
  min: 0,
  max: 127
};

const panBounds = {
  min: -127,
  max: 127
};

const envelopeBounds = {
  min: 0.0,
  max: 2.0
};

const filterBounds = {
  frequency: {
    min: 100,
    max: 20000
  },
  q: {
    min: 0,
    max: 50
  }
};

export default defaultAudioData;
export { tempoBounds, volumeBounds, midiBounds, panBounds, envelopeBounds, filterBounds };
