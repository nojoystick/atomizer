import Audio from './Audio';
import { frequency, modeMap } from '../constants/frequencies';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';

const setPlayer = (time, network, audio) => {
  const nodes = getRootNodes(network); // todo: for better performance, maintain this as part of the redux state
  nodes.forEach(audioNode => {
    if (audioNode && audioNode.notes && audioNode.notes[audio.beatIndex]) {
      const oscillatorNode = Audio.context.createOscillator();
      oscillatorNode.connect(audioNode.osc);
      audioNode.osc.gain.setValueAtTime(audioNode.volume * audioNode.notes[audio.beatIndex].volume, Audio.context.currentTime);
      oscillatorNode.frequency.setValueAtTime(
        audio.key.value + frequency[audioNode.octave * 12 + modeMap[audioNode.mode][audioNode.notes[audio.beatIndex].pitch]],
        Audio.context.currentTime
      );
      oscillatorNode.start();
      setTimeout(() => endNote(oscillatorNode, audioNode.osc), time * 800);
    }
  });
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

const endNote = (oscillatorNode, oscillatorGainNode) => {
  oscillatorGainNode.gain.setValueAtTime(0.0, Audio.context.currentTime, 0.3);
  oscillatorNode.stop();
};

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
  const network = useSelector(state => state.network.network);
  const audio = useSelector(state => state.network.audio);
  const [timeDelay, setTimeDelay] = useState(1);
  const savedCallback = useRef();
  const initialTime = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  useEffect(() => {
    dispatch(networkActions.setBeatIndex(audio.beatIndex < 32 ? audio.beatIndex + 1 : 0));
    if (activityFlag) {
      initialTime.current = new Date().getTime();
      const id = setInterval(() => {
        const currentTime = new Date().getTime();
        const delay = currentTime - initialTime.current;
        initialTime.current = currentTime;
        setTimeDelay(delay / 1000);
        savedCallback.current(timeDelay, network, audio);
      }, periodInMilliseconds);

      return () => {
        clearInterval(id);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodInMilliseconds, activityFlag, timeDelay]);
};

export { setPlayer, usePreciseTimer };
