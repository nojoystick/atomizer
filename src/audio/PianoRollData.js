import Note from './Note';

const PianoRollData = {
  1: {
    0: new Note(0, 100, 'quarter', false),
    4: new Note(3, 100, 'quarter', false),
    8: new Note(5, 100, 'quarter', false),
    12: new Note(3, 100, 'quarter', false)
  },
  2: {
    0: new Note(0, 100, 'whole', false),
    2: new Note(3, 100, 'quarter', false),
    4: new Note(5, 100, 'quarter', false),
    6: new Note(3, 100, 'quarter', false),
    8: new Note(7, 100, 'whole', false),
    10: new Note(5, 100, 'quarter', false),
    12: new Note(3, 100, 'quarter', false),
    14: new Note(5, 100, 'quarter', false)
  },
  3: {
    3: new Note(0, 100, 'whole', false)
  },
  4: {
    0: new Note(8, 100, 'whole', false)
  },
  5: {
    0: new Note(5, 100, 'whole', false)
  },
  6: {
    0: new Note(3, 100, 'whole', false)
  },
  7: {
    0: new Note(6, 100, 'whole', false)
  },
  8: {
    0: new Note(9, 100, 'whole', false)
  },
  9: {
    0: new Note(10, 100, 'whole', false)
  },
  10: {
    0: new Note(3, 100, 'whole', false)
  }
};

export default PianoRollData;
