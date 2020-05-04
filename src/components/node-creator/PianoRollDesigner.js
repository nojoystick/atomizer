import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import RhythmSelector from './RhythmSelector';
import { noteToWidth, dispositionToSemitones, semitonesToDisposition } from '../../constants/frequencies';
import { useSelector } from 'react-redux';
import LabStyles from './LabStyles';
import Note from '../../audio/Note';
import elements from '../../constants/elements';

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

const PianoRollDesigner = () => {
  const [pianoRoll, setPianoRoll] = useState(null);
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const disposition = useSelector(state => state.network.audio.disposition);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const [elementList] = useState(elements(theme));
  const [element, setElement] = useState(elementList[elementIndex - 1]);

  useEffect(() => {
    setElement(elementList[elementIndex - 1]);
  }, [element, elementIndex, elementList]);

  const getHeightForDisposition = () => {
    return disposition === 'c' ? 13 : 8;
  };

  const [note, setNote] = useState('eighth');
  const [height, setHeight] = useState();

  const classes = LabStyles({ screenInfo: screenInfo, theme: theme });

  useEffect(() => {
    const h = getHeightForDisposition(disposition);
    setHeight(h);
    setPianoRoll(initializePianoRoll(note, h, pianoRoll));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disposition, note]);

  useEffect(() => {
    const loadPianoRoll = roll => {
      const h = getHeightForDisposition(disposition);
      if (!roll || Object.keys(roll).length === 0 || !disposition) {
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
    if (element && node) {
      loadPianoRoll(node.notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, node, disposition]);

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
    Object.keys(parsedRoll).length === 0 ? node.setNotes(null) : node.setNotes(parsedRoll);
  };

  const clear = () => {
    setPianoRoll(initializePianoRoll(note, height));
    save();
  };

  return (
    <div className={classes.content}>
      <RhythmSelector note={note} setNote={setNote} />
      <Grid
        width={noteToWidth[note]}
        node={node}
        pianoRoll={pianoRoll}
        setPianoRoll={setPianoRoll}
        height={height}
        color={element && element.color}
        save={save}
        note={note}
      />
      <div className={classes.buttonContainer}>
        <button className={`${classes.cancelButton} ${classes.button}`} onClick={clear}>
          clear
        </button>
      </div>
    </div>
  );
};

export default PianoRollDesigner;
