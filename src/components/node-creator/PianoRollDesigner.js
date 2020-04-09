/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import RhythmSelector from './RhythmSelector';
import { noteToWidth } from '../../constants/frequencies';
import { useSelector } from 'react-redux';
import NodeCreatorModalStyles from './NodeCreatorModalStyles';
import PianoRollData from '../../audio/PianoRollData';

const noteToMod = {
  whole: null,
  half: 8,
  quarter: 4,
  eighth: 2,
  sixteenth: 1
};

/********* todo
 *
 * store cached notes and reload them when the note type changes
 *
 */

const initializePianoRoll = (note, height, pianoRoll) => {
  const mod = noteToMod[note];
  const arr = [];
  for (let i = 0; i < height; ++i) {
    arr.push();
    if (note === 'whole') {
      const val = pianoRoll && pianoRoll[i] && pianoRoll[i][0] === 1 ? 1 : -1;
      arr[i] = { 0: val };
    } else {
      for (let j = 0; j < 16; ++j) {
        if (j % mod === 0) {
          const val = pianoRoll && pianoRoll[i] && pianoRoll[i][j] === 1 ? 1 : -1;
          arr[i] = { ...arr[i], [j]: val };
        }
      }
    }
  }
  return arr;
};

const PianoRollDesigner = ({ element }) => {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const key = useSelector(state => state.network.audio.key);
  const [note, setNote] = useState('eighth');
  const [mode, setMode] = useState('I');
  const [height, setHeight] = useState(key.label === '*' ? 13 : 8);
  const [pianoRoll, setPianoRoll] = useState(initializePianoRoll(note, height));
  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });

  useEffect(() => {
    const h = key.label === '*' ? 13 : 8;
    setHeight(h);
    setPianoRoll(initializePianoRoll(note, h, pianoRoll));
  }, [key, note]);

  useEffect(() => {
    const loadPianoRoll = roll => {
      setNote(setGridForRoll(roll));
      const gridCopy = pianoRoll.slice();
      Object.keys(roll).forEach(key => {
        gridCopy[height - 1 - roll[key].pitch][parseInt(key)] = 1;
      });
      setPianoRoll(gridCopy);
    };

    /**
     * Determine what the smallest note type is in the roll and set the grid to match
     * roll - pianoRoll
     */
    const setGridForRoll = roll => {
      let smallestNote = 0;
      const notes = ['whole', 'half', 'quarter', 'eighth', 'sixteenth'];
      Object.keys(roll).forEach(beatIndex => {
        if (beatIndex % 2 === 1) {
          smallestNote = 4;
          return notes[smallestNote];
        } else if (beatIndex === '0') {
          smallestNote = 0;
        } else if (beatIndex % 8 === 0 && smallestNote <= 1) {
          smallestNote = 1;
        } else if (beatIndex % 4 === 0 && smallestNote <= 2) {
          smallestNote = 2;
        } else if (beatIndex % 2 === 0 && smallestNote <= 3) {
          smallestNote = 3;
        }
      });
      return notes[smallestNote];
    };
    if (element && PianoRollData[element.atomicNumber]) {
      loadPianoRoll(PianoRollData[element.atomicNumber]);
    }
  }, [element]);

  const clear = () => {
    const arr = [];
    for (let i = 0; i < pianoRoll.length; i++) {
      arr.push([]);
      for (let j = 0; j < pianoRoll[0].length; j++) {
        arr[i].push(false);
      }
    }
    setPianoRoll(arr);
  };

  useEffect(() => {
    setPianoRoll(initializePianoRoll(note, height, pianoRoll));
  }, [note]);

  return (
    <div className={classes.content}>
      <h3 className={classes.title}>piano roll</h3>
      <RhythmSelector note={note} setNote={setNote} />
      <Grid width={noteToWidth[note]} mode={mode} pianoRoll={pianoRoll} setPianoRoll={setPianoRoll} height={height} />
      <button className={`${classes.buttonContainer} ${classes.button}`} onClick={clear}>
        clear
      </button>
    </div>
  );
};

export default PianoRollDesigner;
