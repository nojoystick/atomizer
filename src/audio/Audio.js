class Audio {
  static context = new (window.AudioContext || window.webkitAudioContext)();
  static masterGainNode = Audio.context.createGain();
  static preampGainNode = Audio.context.createGain();
  static analyzer = Audio.context.createAnalyser();
  static distortion = Audio.context.createWaveShaper();
  static gainNode = Audio.context.createGain();
  static lpFilter = Audio.context.createBiquadFilter();
  static hpFilter = Audio.context.createBiquadFilter();
  static convolver = Audio.context.createConvolver();
}

export default Audio;
