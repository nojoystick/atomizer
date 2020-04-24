import Audio from './Audio';
import { frequency, modeToSemitoneOffsetMap, transformToDisposition } from '../constants/frequencies';

class Player {
  constructor() {
    this.timerId = null;
    this.nextNoteTime = Audio.context.currentTime;
    this.beatIndex = 0;
  }
  setTimerId(_id) {
    this.timerId = _id;
  }
  start(network, audio, gain, tempo) {
    Audio.masterGainNode.gain.setTargetAtTime(gain, Audio.context.currentTime, 0.001);
    const interval = bpmToMs(tempo);
    const nodes = getRootNodes(network);
    this.nextNoteTime = Audio.context.currentTime;
    this.timerId = setInterval(() => this.schedule(interval, network, audio, nodes), interval);
  }
  updateNetwork(_network) {
    this.network = _network;
  }
  stop() {
    clearTimeout(this.timerId);
    Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001);
  }
  schedule(interval, network, audio, nodes) {
    while (this.nextNoteTime < Audio.context.currentTime + 0.01) {
      this.nextNoteTime += interval / 1000;
      this.playNote(this.nextNoteTime, network, audio, interval, nodes);
    }
  }
  playNote(time, network, audio, interval, nodes) {
    nodes.forEach(audioNode => {
      if (audioNode && !audioNode.mute && audioNode.solo !== -1 && audioNode.notes && audioNode.notes[this.beatIndex]) {
        audioNode.notes[this.beatIndex].forEach(note => {
          const oscillatorNode = Audio.context.createOscillator();
          oscillatorNode.connect(audioNode.osc);
          audioNode.osc.gain.setTargetAtTime(audioNode.volume * note.volume, time, 0.015);
          oscillatorNode.frequency.setValueAtTime(
            frequency[
              audio.key.value +
                audioNode.octave * 12 +
                transformForKey(audio.disposition, modeToSemitoneOffsetMap[audioNode.mode] + note.pitch)
            ],
            time
          );
          oscillatorNode.start(time);
          const stopTime = time + (note.length * interval) / 1000;
          audioNode.osc.gain.setTargetAtTime(0, stopTime - 0.05, 0.015);
          oscillatorNode.stop(stopTime - 0.0001);
        });
      }
    });
    this.beatIndex = this.beatIndex < 15 ? this.beatIndex + 1 : 0;
  }
}

const bpmToMs = bpm => {
  return 60000 / bpm / 4;
};

const transformForKey = (disposition, note) => {
  const val = transformToDisposition[disposition][note];
  return val;
};

const getRootNodes = network => {
  const rootNodes = [];
  Object.values(network.body.nodes).forEach(node => {
    if (network.getConnectedNodes(node.id, 'to').length === 0) {
      rootNodes.push(node.options.audioNode);
    }
  });
  return rootNodes;
};

export default Player;
