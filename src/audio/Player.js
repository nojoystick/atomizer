import Audio from './Audio';
import { frequency, modeToSemitoneOffsetMap, transformToDisposition } from '../constants/frequencies';

class Player {
  static beatIndex = 0;
  static interval = 0;
  static nodesThisMeasure = null;

  constructor() {
    this.timerId = null;
    this.nextNoteTime = Audio.context.currentTime;
    this.network = null;
    this.rootNodes = null;
    this.measuresPlayed = 0;
  }
  setTimerId(_id) {
    this.timerId = _id;
  }
  start(network, audio, gain, tempo) {
    this.updateNetwork(network);
    this.updateInterval(tempo);
    Audio.masterGainNode.gain.setTargetAtTime(gain, Audio.context.currentTime, 0.001);
    this.nextNoteTime = Audio.context.currentTime;
    this.timerId = setInterval(() => this.schedule(audio), Player.interval);
    return Player.interval;
  }
  updateNetwork(_network) {
    this.network = _network;
    this.rootNodes = getRootNodes(_network);
  }
  updateInterval(_tempo) {
    Player.interval = bpmToMs(_tempo);
  }
  stop() {
    clearTimeout(this.timerId);
    Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001);
  }
  schedule(audio) {
    while (this.nextNoteTime < Audio.context.currentTime + 0.01) {
      this.nextNoteTime += Player.interval / 1000;
      this.playNote(this.nextNoteTime, audio);
    }
  }
  playNote(time, audio) {
    if (Player.beatIndex === 0) {
      this.updateNodesForNewMeasure();
      ++this.measuresPlayed;
    }
    Player.nodesThisMeasure &&
      Player.nodesThisMeasure.length > 0 &&
      Player.nodesThisMeasure.forEach(audioNode => {
        if (audioNode && audioNode.notes && audioNode.notes[Player.beatIndex]) {
          audioNode.notes[Player.beatIndex].forEach(note => {
            const stopTime = time + (note.length * Player.interval) / 1000;
            const envelope = buildEnvelope(audioNode, time, stopTime, audioNode.nodes.panner);
            const noteGainNode = buildGainNode(note.volume, time, stopTime, audioNode.release > 0.05);
            noteGainNode.connect(envelope.envelope);
            audioNode.waveforms.forEach(waveform => {
              const oscillatorNode = Audio.context.createOscillator();
              oscillatorNode.connect(noteGainNode);
              oscillatorNode.type = waveform;
              oscillatorNode.frequency.setValueAtTime(
                frequency[
                  audio.key.value +
                    audioNode.octave * 12 +
                    transformForKey(audio.disposition, modeToSemitoneOffsetMap[audioNode.mode] + note.pitch)
                ],
                time
              );
              oscillatorNode.start ? oscillatorNode.start(time) : oscillatorNode.noteOn(time);
              oscillatorNode.stop
                ? oscillatorNode.stop(stopTime + audioNode.release)
                : oscillatorNode.stop(stopTime + audioNode.release);
            });
          });
        }
      });
    Player.beatIndex = Player.beatIndex < 15 ? Player.beatIndex + 1 : 0;
  }

  updateNodesForNewMeasure = () => {
    let nodesThisMeasure = [];
    this.rootNodes.forEach(node => {
      if (this.network.getConnectedNodes(node.id).length === 0) {
        nodesThisMeasure.push(node.options.audioNode);
      }
      node.depth = 0;
      const maxDepth = getMaxDepth(node, this.network, 0);
      const nodes = getAllNodesAtDepth(this.measuresPlayed % (maxDepth + 1), node, this.network);
      nodesThisMeasure = [...nodesThisMeasure, ...nodes];
    });
    Player.nodesThisMeasure = [...nodesThisMeasure];
  };
}

/**
 * Return an array of all the nodes at the specified depth
 * @param {*} depth
 * @param {*} node
 * @param {*} network
 */
const getAllNodesAtDepth = (depth, node, network) => {
  if (node.depth === depth) {
    return [node.options.audioNode];
  }
  const children = network.getConnectedNodes(node.id, 'to');
  let nodesToReturn = [];
  if (children.length !== 0) {
    children.forEach(child => {
      const c = network.body.nodes[child];
      if (c.depth === depth) {
        nodesToReturn.push(c.options.audioNode);
      } else {
        nodesToReturn = [...nodesToReturn, ...getAllNodesAtDepth(depth, c, network)];
      }
    });
  }
  return nodesToReturn;
};

/**
 * Get the deepest point in the graph; tag each child with its depth while doing it
 * @param {*} node
 * @param {*} network
 */
const getMaxDepth = (node, network, currDepth) => {
  const children = network.getConnectedNodes(node.id, 'to');
  if (children.length === 0) {
    return 0;
  } else {
    const maxDepths = [];
    children.forEach(child => {
      const n = network.body.nodes[child];
      n.depth = currDepth + 1;
      maxDepths.push(getMaxDepth(n, network, currDepth + 1) + 1);
    });
    return Math.max(...maxDepths);
  }
};

const buildGainNode = (volume, startTime, stopTime, releaseActive) => {
  const node = Audio.context.createGain();
  node.gain.setValueCurveAtTime(expCurve(0, volume), startTime, 0.015);
  !releaseActive && node.gain.setValueCurveAtTime(expCurve(volume, 0), stopTime - 0.015, 0.015);
  return node;
};

const buildEnvelope = (audioNode, startTime, stopTime, connectTo) => {
  const envelope = Audio.context.createGain();
  const duration = stopTime - startTime;
  const willCompleteAttack = duration > audioNode.attack;
  const willCompleteDecay = duration > audioNode.attack + audioNode.sustain + audioNode.decay;
  const adsr = {
    attackDuration: willCompleteAttack ? audioNode.attack : duration,
    attackTo: willCompleteAttack ? 1 : duration / audioNode.attack,
    attackStart: startTime,
    willCompleteAttack: willCompleteAttack,
    decayDuration: willCompleteDecay ? audioNode.decay : duration - audioNode.attack - audioNode.sustain,
    decayTo: willCompleteDecay ? 0 : 1.0 - (duration - audioNode.attack - audioNode.sustain) / audioNode.decay,
    decayStart: startTime + audioNode.attack + audioNode.sustain,
    willCompleteDecay: willCompleteDecay,
    releaseDuration: audioNode.release,
    releaseStart: stopTime
  };
  try {
    envelope.connect(connectTo);
    adsr.attackDuration > 0
      ? envelope.gain.setValueCurveAtTime(expCurve(0, adsr.attackTo), adsr.attackStart, adsr.attackDuration)
      : envelope.gain.setTargetAtTime(1, startTime, 0.015);
    adsr.decayDuration > 0 && envelope.gain.setValueCurveAtTime(expCurve(1, adsr.decayTo), adsr.decayStart, adsr.decayDuration);
    const releaseFrom = audioNode.release > 0 && getValueAtReleaseStart(adsr, audioNode);
    adsr.releaseDuration > 0.05 &&
      envelope.gain.setValueCurveAtTime(expCurve(releaseFrom, 0), adsr.releaseStart, adsr.releaseDuration);
  } catch (e) {}
  return { envelope: envelope, envTime: adsr.decayStart + adsr.decayDuration };
};

const getValueAtReleaseStart = (adsr, audioNode) => {
  if (!adsr.willCompleteAttack) {
    return adsr.attackTo;
  } else if (!adsr.willCompleteDecay) {
    return adsr.decayTo;
  } else {
    return audioNode.decay > 0 && audioNode.attack > 0 ? 0 : 1;
  }
};

const bpmToMs = bpm => {
  return 60000 / bpm / 4;
};

const transformForKey = (disposition, note) => {
  const val = transformToDisposition[disposition][note];
  return val;
};

/**
 * Custom curve, linearValueAtTime can't be cancelled midway through
 * @param {*} start
 * @param {*} end
 */
function expCurve(start, end) {
  var count = 10;
  var t = 0;
  var curve = new Float32Array(count + 1);
  start = Math.max(start, 0.0000001);
  end = Math.max(end, 0.0000001);
  for (var i = 0; i <= count; ++i) {
    curve[i] = start * Math.pow(end / start, t);
    t += 1 / count;
  }
  return curve;
}

const getRootNodes = network => {
  const rootNodes = [];
  network &&
    Object.values(network.body.nodes).forEach(node => {
      if (network.getConnectedNodes(node.id, 'from').length === 0) {
        rootNodes.push(node);
      }
    });
  return rootNodes;
};

export default Player;
