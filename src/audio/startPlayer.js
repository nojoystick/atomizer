import Audio from './Audio';
import { frequency, toPenta } from '../constants/frequencies';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../redux/actions';

const setPlayer = (time, network, audio) => {
  const nodes = network.getConnectedNodes(0, 'to');
  nodes.forEach(id => {
    const { atomicNumber, oscillator } = network.body.nodes[id].options;
    if (oscillator) {
      const oscillatorNode = Audio.context.createOscillator();
      oscillatorNode.connect(oscillator.oscillatorGainNode);
      oscillator.oscillatorGainNode.gain.setValueAtTime(0.3, Audio.context.currentTime, 0.05);
      oscillatorNode.frequency.setValueAtTime(
        frequency[toPenta[Math.floor(atomicNumber / 2) + 20 + audio.beatIndex]],
        Audio.context.currentTime
      );
      oscillatorNode.start();
      setTimeout(() => endNote(oscillatorNode, oscillator.oscillatorGainNode), time * 800);
    }
  });
};

const endNote = (oscillatorNode, oscillatorGainNode) => {
  oscillatorGainNode.gain.setValueAtTime(0.0, Audio.context.currentTime, 0.3);
  oscillatorNode.stop();
};

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
  const { network, audio } = useSelector(state => state.network);
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
