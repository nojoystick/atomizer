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
}

export default Audio;
