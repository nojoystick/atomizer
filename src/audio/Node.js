import PianoRollData from './PianoRollData';
import defaultAudioData from '../constants/audio-data';
import Audio from './Audio';
import { volume } from '../constants/frequencies';

class Node {
  constructor(elementIndex) {
    this.osc = this.addOscillatorNode();
    this.volume = defaultAudioData.volume;
    this.intensity = defaultAudioData.intensity;
    this.mode = defaultAudioData.mode;
    if (elementIndex && PianoRollData[elementIndex]) {
      this.notes = PianoRollData[elementIndex];
    }
  }

  addOscillatorNode = () => {
    const oscillatorGainNode = Audio.context.createGain();
    oscillatorGainNode.gain.setValueAtTime(defaultAudioData.volume, Audio.context.currentTime);
    oscillatorGainNode.connect(Audio.preampGainNode);
    return oscillatorGainNode;
  };

  setVolume(vol) {
    console.log(vol);
    this.volume = volume[vol];
  }

  setIntensity = intensity => {
    this.intensity = intensity;
  };
}

export default Node;
