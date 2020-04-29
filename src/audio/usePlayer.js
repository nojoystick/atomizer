import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Player from './Player';
import { configActions } from '../redux/actions';

export default function usePlayer() {
  const [player] = useState(new Player());
  const playing = useSelector(state => state.network.audio.playing);
  const tempo = useSelector(state => state.network.audio.masterTempo);
  const gain = useSelector(state => state.network.audio.masterGain);
  const network = useSelector(state => state.network.network);
  const graphInfo = useSelector(state => state.network.graphInfo);
  const audio = useSelector(state => state.network.audio);
  const [timerId, setTimerId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playing) {
      const interval = player.start(network, audio, gain, tempo);
      setTimerId(setInterval(() => dispatch(configActions.setItemToUpdate('beatIndex', Math.random())), interval));
    } else {
      clearInterval(timerId);
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

  useEffect(() => {
    player.updateNetwork(network);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, graphInfo]);
}
