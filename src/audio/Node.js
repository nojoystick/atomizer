import defaultAudioData from '../constants/audio-data';
import Audio from './Audio';
import { transformElementToPureObject } from './PianoRollData';
import { v4 as uuidv4 } from 'uuid';

class Node {
  constructor(pianoRoll, somethingIsSoloed, nodeJSON) {
    this.nodes = buildNodes();
    if (nodeJSON) {
      Object.keys(nodeJSON).forEach(key => {
        this[key] = nodeJSON[key];
      });
    } else {
      Object.keys(defaultAudioData).forEach(key => {
        this[key] = Array.isArray(defaultAudioData[key]) ? defaultAudioData[key].slice() : defaultAudioData[key];
      });
    }
    this.initializeNodes();
    this.notes = pianoRoll;
    this.solo = somethingIsSoloed ? 1 : defaultAudioData.solo;
    this.id = uuidv4();
  }
  initializeNodes() {
    this.setVolume(this.volume);
    this.setIntensity(this.intensity);
    this.setPan(this.pan);
    this.setLPFilterFrequency(this.lpFilterFrequency);
    this.setLPFilterQ(this.lpFilterQ);
    this.setHPFilterFrequency(this.hpFilterFrequency);
    this.setHPFilterQ(this.hpFilterQ);
    this.setMute(this.mute);
    this.setSolo(this.solo);
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
      ...nodesToPureObject(this.nodes),
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
  updateAutomationValues(dataset, key, note) {
    const data = dataset.filter(el => el.label === key);
    if (data[0]) {
      this[key] = data[0].data.slice();
    }
  }
  resetAutomation(key) {
    this[key] = defaultAudioData[key].slice();
  }
  setAutomatedVolume(automatedValue, time) {
    this.nodes.gain.gain.exponentialRampToValueAtTime(this.volume * automatedValue === 0 ? 0.00001 : automatedValue, time, 0.03);
  }
  setAutomatedPan(automatedValue, time) {
    // this.nodes.panner.position.exponentialRampToValueAtTime(this.pan * (automatedValue === 0 ? 0.00001 : automatedValue), time, 0.03);
  }
  setAutomatedHpFilterFrequency(automatedValue, time) {
    this.hpFilterFrequency * automatedValue === 0
      ? this.nodes.hpFilter.frequency.setTargetAtTime(0, time, 0.03)
      : this.nodes.hpFilter.frequency.exponentialRampToValueAtTime(this.hpFilterFrequency * automatedValue, time, 0.03);
  }
  setAutomatedHpFilterQ(automatedValue, time) {
    this.hpFilterQ * automatedValue === 0
      ? this.nodes.hpFilter.Q.setTargetAtTime(0, time, 0.03)
      : this.nodes.hpFilter.Q.exponentialRampToValueAtTime(this.hpFilterQ * automatedValue, time, 0.03);
  }
  setAutomatedLpFilterFrequency(automatedValue, time) {
    this.lpFilterFrequency * automatedValue === 0
      ? this.nodes.lpFilter.frequency.setTargetAtTime(0, time, 0.03)
      : this.nodes.lpFilter.frequency.exponentialRampToValueAtTime(this.lpFilterFrequency * automatedValue, time, 0.03);
  }
  setAutomatedLpFilterQ(automatedValue, time) {
    this.lpFilterQ * automatedValue === 0
      ? this.nodes.lpFilter.Q.setTargetAtTime(0, time, 0.03)
      : this.nodes.lpFilter.Q.exponentialRampToValueAtTime(this.lpFilterQ * automatedValue, time, 0.03);
  }
  setAutomatedValuesForNote(beatIndex, time) {
    this.setAutomatedVolume(this.volumeAutomation[beatIndex], time);
    this.setAutomatedPan(this.panAutomation[beatIndex], time);
    this.setAutomatedHpFilterFrequency(this.hpFilterFrequencyAutomation[beatIndex], time);
    this.setAutomatedHpFilterQ(this.hpFilterQAutomation[beatIndex], time);
    this.setAutomatedLpFilterFrequency(this.lpFilterFrequencyAutomation[beatIndex], time);
    this.setAutomatedLpFilterQ(this.lpFilterQAutomation[beatIndex], time);
  }
  static renderFromJSON(node) {
    return new Node(node.notes, node.somethingIsSoloed, node);
  }
}

const nodesToPureObject = _nodes => {
  return {
    lpFilterFrequency: _nodes.lpFilter.frequency.value,
    lpFilterQ: _nodes.lpFilter.Q.value,
    hpFilterFrequency: _nodes.hpFilter.frequency.value,
    hpFilterQ: _nodes.hpFilter.Q.value,
    gain: _nodes.gain.gain.value,
    pan: _nodes.panner.positionX.value
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
