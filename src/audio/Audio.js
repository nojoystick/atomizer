class Audio {
  static context = new (window.AudioContext || window.webkitAudioContext)();
  static masterGainNode = Audio.context.createGain();
  static preampGainNode = Audio.context.createGain();

  static unlockAudioContext() {
    if (Audio.context.state !== 'suspended') return;
    const b = document.body;
    const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
    events.forEach(e => b.addEventListener(e, unlock, false));
    function unlock() {
      Audio.context.resume().then(clean);
    }
    function clean() {
      events.forEach(e => b.removeEventListener(e, unlock));
    }
  }

  /* Copyright 2013 Chris Wilson
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  */

  /*
  This monkeypatch library is intended to be included in projects that are
  written to the proper AudioContext spec (instead of webkitAudioContext),
  and that use the new naming and proper bits of the Web Audio API (e.g.
  using BufferSourceNode.start() instead of BufferSourceNode.noteOn()), but may
  have to run on systems that only support the deprecated bits.
  */
  static monkeyPatch() {
    if (window.hasOwnProperty('webkitAudioContext') && !window.hasOwnProperty('AudioContext')) {
      window.AudioContext = window.webkitAudioContext;
      if (window.AudioContext.prototype.hasOwnProperty('createOscillator')) {
        window.AudioContext.prototype.internal_createOscillator = window.AudioContext.prototype.createOscillator;
        window.AudioContext.prototype.createOscillator = function() {
          var node = this.internal_createOscillator();
          if (!node.start) {
            node.start = function(when) {
              this.noteOn(when || 0);
            };
          } else {
            node.internal_start = node.start;
            node.start = function(when) {
              node.internal_start(when || 0);
            };
          }
          if (!node.stop) {
            node.stop = function(when) {
              this.noteOff(when || 0);
            };
          } else {
            node.internal_stop = node.stop;
            node.stop = function(when) {
              node.internal_stop(when || 0);
            };
          }
          if (!node.setPeriodicWave) node.setPeriodicWave = node.setWaveTable;
          fixSetTarget(node.frequency);
          fixSetTarget(node.detune);
          return node;
        };
      }
    }
  }
}

function fixSetTarget(param) {
  if (!param)
    // if NYI, just return
    return;
  if (!param.setTargetAtTime) param.setTargetAtTime = param.setTargetValueAtTime;
}

export default Audio;
