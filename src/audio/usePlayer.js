/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Player from './Player';
import { configActions, networkActions } from '../redux/actions';
import { useLocation } from 'react-router-dom';

export default function usePlayer() {
  const [player] = useState(new Player());
  const playing = useSelector(state => state.network.audio.playing);
  const tempo = useSelector(state => state.network.audio.masterTempo);
  const gain = useSelector(state => state.network.audio.masterGain);
  const network = useSelector(state => state.network.network);
  const shouldUpdateNetwork = useSelector(state => state.network.shouldUpdateNetwork);
  const graphInfo = useSelector(state => state.network.graphInfo);
  const theme = useSelector(state => state.network.theme);
  const audio = useSelector(state => state.network.audio);
  const [timerId, setTimerId] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    return function unmount() {
      dispatch(networkActions.stop());
      clearInterval(timerId);
      player.stop();
    };
  }, [location]);

  useEffect(() => {
    if (playing) {
      const interval = player.start(network, audio, gain, tempo, theme);
      setTimerId(setInterval(() => dispatch(configActions.setItemToUpdate('beatIndex', Math.random())), interval));
    } else {
      clearInterval(timerId);
      player.stop();
    }
  }, [playing]);

  useEffect(() => {
    if (playing) {
      player.stop();
      player.start(network, audio, gain, tempo, theme);
    }
  }, [tempo]);

  useEffect(() => {
    player.updateNetwork(network);
  }, [network, shouldUpdateNetwork, graphInfo]);
}
