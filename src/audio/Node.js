import defaultAudioData from '../constants/audio-data';
import Audio from './Audio';

class Node {
  constructor(pianoRoll, osc, volume, intensity, mode, octave, pan, somethingIsSoloed) {
    this.osc = osc ? osc : addOscillatorNode();
    this.volume = volume ? volume : defaultAudioData.volume;
    this.intensity = intensity ? intensity : defaultAudioData.intensity;
    this.mode = mode ? mode : defaultAudioData.mode;
    this.notes = pianoRoll;
    this.octave = octave ? octave : 4;
    this.pan = pan ? pan : 0.0;
    this.mute = false;
    this.solo = somethingIsSoloed ? 1 : 0;
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
  setPan(_pan) {
    this.pan = _pan;
  }
  setMute(_mute) {
    this.mute = _mute;
  }
  setSolo(_solo) {
    this.solo = _solo;
  }
  toggleMute() {
    this.mute = !this.mute;
  }
  toggleSolo() {
    switch (this.solo) {
      case -1:
      case 0:
        this.solo = 1;
        break;
      case 1:
        this.solo = -1;
        break;
      default:
    }
  }
  getCloneWithNewRoll(roll) {
    return new Node(roll, this.osc, this.volume, this.intensity, this.mode, this.octave, this.pan);
  }
}

const addOscillatorNode = () => {
  const oscillatorGainNode = Audio.context.createGain();
  oscillatorGainNode.gain.setValueAtTime(defaultAudioData.volume, Audio.context.currentTime);
  oscillatorGainNode.connect(Audio.preampGainNode);
  return oscillatorGainNode;
};

export default Node;
