import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';

export default function usePlayer() {
  const [player] = useState(new Player());
  const playing = useSelector(state => state.network.audio.playing);
  const tempo = useSelector(state => state.network.audio.masterTempo);
  const gain = useSelector(state => state.network.audio.masterGain);
  const network = useSelector(state => state.network.network);
  const audio = useSelector(state => state.network.audio);

  useEffect(() => {
    if (playing) {
      player.start(network, audio, gain, tempo);
    } else {
      player.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    if (playing) {
      player.stop();
      player.start(network, audio, gain, tempo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempo]);
}
