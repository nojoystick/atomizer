import PianoRollData from './PianoRollData';
import defaultAudioData from '../constants/audio-data';
import Audio from './Audio';

class Node {
  constructor(elementIndex) {
    this.osc = addOscillatorNode();
    this.volume = defaultAudioData.volume;
    this.intensity = defaultAudioData.intensity;
    this.mode = defaultAudioData.mode;
    this.notes = PianoRollData[elementIndex] ? PianoRollData[elementIndex] : null;
    this.octave = 4;
  }

  setVolume(_volume) {
    this.volume = _volume;
  }
  setIntensity(_intensity) {
    this.intensity = _intensity;
  }
  setMode(_mode) {
    this.mode = _mode;
  }
  setNotes(_notes) {
    this.notes = _notes;
  }
  setOctave(_octave) {
    this.octave = _octave;
  }
}

const addOscillatorNode = () => {
  const oscillatorGainNode = Audio.context.createGain();
  oscillatorGainNode.gain.setValueAtTime(defaultAudioData.volume, Audio.context.currentTime);
  oscillatorGainNode.connect(Audio.preampGainNode);
  return oscillatorGainNode;
};

export default Node;
