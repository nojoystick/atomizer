import defaultAudioData from '../constants/audio-data';
import Audio from './Audio';
import { transformElementToPureObject } from './PianoRollData';

class Node {
  constructor(pianoRoll, somethingIsSoloed, nodeJSON) {
    if (nodeJSON) {
      Object.keys(nodeJSON).forEach(key => {
        this[key] = nodeJSON[key];
      });
    } else {
      Object.keys(defaultAudioData).forEach(key => {
        this[key] = defaultAudioData[key];
      });
    }
    this.notes = pianoRoll;
    this.nodes = buildNodes();
    this.solo = somethingIsSoloed ? 1 : defaultAudioData.solo;
  }

  setVolume(_volume) {
    this.nodes.gain.gain.setTargetAtTime(_volume, Audio.context.currentTime, 0.03);
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
    this.nodes.panner.setPosition(_pan, 0, 1 - Math.abs(_pan));
    this.pan = _pan;
  }
  setWaveforms(_waveforms) {
    this.waveforms = _waveforms;
  }
  addWaveform(_waveform) {
    this.waveforms.push(_waveform);
  }
  removeWaveform(_waveform) {
    if (this.waveforms.length > 1) {
      const filteredWaveforms = this.waveforms.filter(el => el !== _waveform);
      this.waveforms = filteredWaveforms;
    }
  }
  setAttack(_attack) {
    this.attack = _attack;
  }
  setDecay(_decay) {
    this.decay = _decay;
  }
  setSustain(_sustain) {
    this.sustain = _sustain;
  }
  setRelease(_release) {
    this.release = _release;
  }
  setLPFilterFrequency(_freq) {
    this.nodes.lpFilter.frequency.setTargetAtTime(_freq, Audio.context.currentTime, 0.03);
    this.lpFilterFrequency = _freq;
  }
  setLPFilterQ(_q) {
    this.nodes.lpFilter.Q.setTargetAtTime(_q, Audio.context.currentTime, 0.03);
    this.lpFilterQ = _q;
  }
  setHPFilterFrequency(_freq) {
    this.nodes.hpFilter.frequency.setTargetAtTime(_freq, Audio.context.currentTime, 0.03);
    this.hpFilterFrequency = _freq;
  }
  setHPFilterQ(_q) {
    this.nodes.hpFilter.Q.setTargetAtTime(_q, Audio.context.currentTime, 0.03);
    this.hpFilterQ = _q;
  }
  setMute(_mute) {
    this.nodes.gain.gain.setTargetAtTime(_mute ? 0 : this.volume, Audio.context.currentTime, 0.03);
    this.mute = _mute;
  }
  setSolo(_solo) {
    this.nodes.gain.gain.setTargetAtTime(_solo === -1 ? 0 : this.volume, Audio.context.currentTime, 0.03);
    this.solo = _solo;
  }
  parseSolo(somethingIsSoloed) {
    this.solo = somethingIsSoloed ? 1 : 0;
  }
  toggleMute() {
    this.nodes.gain.gain.setTargetAtTime(this.mute ? this.volume : 0, Audio.context.currentTime, 0.03);
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
    this.nodes.gain.gain.setTargetAtTime(this.solo === -1 ? 0 : this.volume, Audio.context.currentTime, 0.03);
  }
  transformToPureObject() {
    return {
      nodes: nodesToPureObject(this.nodes),
      volume: this.volume,
      intensity: this.intensity,
      mode: this.mode,
      notes: transformElementToPureObject(this.notes),
      octave: this.octave,
      waveforms: this.waveforms,
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
      pan: this.pan,
      mute: this.mute,
      solo: this.solo
    };
  }
  static renderFromJSON(node) {
    return new Node(node.notes, node.somethingIsSoloed, node);
  }
}

const nodesToPureObject = _nodes => {
  return {
    lpFilter: {
      frequency: _nodes.lpFilter.frequency.value,
      Q: _nodes.lpFilter.Q.value
    },
    hpFilter: {
      frequency: _nodes.hpFilter.frequency.value,
      Q: _nodes.hpFilter.Q.value
    },
    gain: {
      gain: _nodes.gain.gain.value
    },
    panner: {
      pan: _nodes.panner.positionX.value
    }
  };
};

const buildNodes = () => {
  const gain = addGainNode();
  const panner = buildPanner();
  const hpFilter = buildFilter('highpass');
  const lpFilter = buildFilter('lowpass');
  buildSignalChain([panner, hpFilter, lpFilter, gain]);
  return { gain, panner, lpFilter, hpFilter };
};

const buildPanner = () => {
  const panner = Audio.context.createPanner();
  panner.panningModel = 'equalpower';
  return panner;
};

const buildFilter = type => {
  const filter = Audio.context.createBiquadFilter();
  filter.type = type;
  return filter;
};

const addGainNode = () => {
  const oscillatorGainNode = Audio.context.createGain();
  return oscillatorGainNode;
};

const buildSignalChain = nodes => {
  nodes.forEach((node, index) => {
    node.connect(index < nodes.length - 1 ? nodes[index + 1] : Audio.preampGainNode);
  });
};

export default Node;
