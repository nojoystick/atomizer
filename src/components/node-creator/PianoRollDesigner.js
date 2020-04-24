import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import RhythmSelector from './RhythmSelector';
import { noteToWidth, dispositionToSemitones, semitonesToDisposition } from '../../constants/frequencies';
import { useSelector, useDispatch } from 'react-redux';
import NodeCreatorModalStyles from './NodeCreatorModalStyles';
import Note from '../../audio/Note';
import { networkActions } from '../../redux/actions';
import { transformElementToPureObject } from '../../audio/PianoRollData';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

const noteToMod = {
  whole: null,
  half: 8,
  quarter: 4,
  eighth: 2,
  sixteenth: 1
};

const initializePianoRoll = (note, height, pianoRoll) => {
  const mod = noteToMod[note];
  const arr = [];
  for (let i = 0; i < height; ++i) {
    arr.push();
    for (let j = 0; j < 16; ++j) {
      if (j % mod === 0 || (note === 'whole' && j === 0)) {
        const val = pianoRoll && pianoRoll[i] && (pianoRoll[i][j] === 1 || pianoRoll[i][j] === -2) ? 1 : -1;
        arr[i] = { ...arr[i], [j]: val };
      } else if (pianoRoll && pianoRoll[i] && (pianoRoll[i][j] === 1 || pianoRoll[i][j] === -2)) {
        arr[i] = { ...arr[i], [j]: -2 };
      }
    }
  }
  return arr;
};

const PianoRollDesigner = ({ element, pianoRoll, setPianoRoll, node, setNode, mode, setMode }) => {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const disposition = useSelector(state => state.network.audio.disposition);
  const pianoRollData = useSelector(state => state.network.audio.pianoRollData);
  const profile = useSelector(state => state.firebase.profile);
  const id = !profile.isEmpty ? profile.email : 'default';

  useFirestoreConnect(() => [{ collection: 'pianoRollData', doc: id }]);
  const firestore = useFirestore();

  const getHeightForDisposition = () => {
    return disposition === 'c' ? 13 : 8;
  };

  const [note, setNote] = useState('eighth');
  const [height, setHeight] = useState();

  const classes = NodeCreatorModalStyles({ screenInfo: screenInfo, theme: theme });
  const dispatch = useDispatch();

  useEffect(() => {
    const h = getHeightForDisposition(disposition);
    setHeight(h);
    setPianoRoll(initializePianoRoll(note, h, pianoRoll));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disposition, note]);

  useEffect(() => {
    const loadPianoRoll = roll => {
      const h = getHeightForDisposition(disposition);
      if (!roll || Object.keys(roll).length === 0) {
        setPianoRoll(initializePianoRoll(note, h));
        return null;
      }
      setNote(setGridForRoll(roll));
      const grid = initializePianoRoll(note, h);
      Object.keys(roll).forEach(beat => {
        roll[beat].forEach(note => {
          if (grid[h - 1 - semitonesToDisposition[disposition][note.pitch]]) {
            grid[h - 1 - semitonesToDisposition[disposition][note.pitch]][parseInt(beat)] = 1;
          }
        });
      });
      setPianoRoll(grid);
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
    if (element && pianoRollData) {
      updateNode(pianoRollData[element.atomicNumber]);
      loadPianoRoll(pianoRollData[element.atomicNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, disposition]);

  const save = () => {
    let parsedRoll = {};
    Object.keys(pianoRoll).forEach(i => {
      Object.keys(pianoRoll[i]).forEach(j => {
        if (pianoRoll[i][j] === 1) {
          if (!parsedRoll[j]) {
            parsedRoll[j] = [];
          }
          parsedRoll[j].push(new Note(dispositionToSemitones[disposition][height - 1 - i], 120, note, false));
        }
      });
    });
    if (Object.keys(parsedRoll).length === 0) {
      updateNode(null);
      dispatch(networkActions.deletePianoRollForElement(element.atomicNumber));
      firestore
        .collection('pianoRollData')
        .doc(id)
        .delete();
    } else {
      updateNode(parsedRoll);
      dispatch(networkActions.setPianoRollForElement(element.atomicNumber, parsedRoll));
      !profile.isEmpty &&
        firestore
          .collection('pianoRollData')
          .doc(id)
          .update({ [element.atomicNumber]: transformElementToPureObject(parsedRoll) });
    }
  };

  const updateNode = newNotes => {
    setNode(node.getCloneWithNewRoll(newNotes));
  };

  const clear = () => {
    setPianoRoll(initializePianoRoll(note, height));
  };

  return (
    <div className={classes.content}>
      <RhythmSelector note={note} setNote={setNote} />
      {pianoRoll && (
        <Grid
          width={noteToWidth[note]}
          mode={mode}
          pianoRoll={pianoRoll}
          setPianoRoll={setPianoRoll}
          height={height}
          color={element.color}
          save={save}
        />
      )}
      <div className={classes.buttonContainer}>
        <button className={`${classes.cancelButton} ${classes.button}`} onClick={clear}>
          clear
        </button>
        <button className={`${classes.button} ${classes.confirmButton}`} onClick={save}>
          save
        </button>
      </div>
    </div>
  );
};

export default PianoRollDesigner;
