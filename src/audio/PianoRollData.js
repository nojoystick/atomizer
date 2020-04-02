import Note from './Note';

const PianoRollData = {
  1: {
    0: new Note(50, 100, 'quarter', false),
    8: new Note(54, 100, 'quarter', false),
    16: new Note(57, 100, 'quarter', false),
    24: new Note(54, 100, 'quarter', false)
  },
  2: {
    0: new Note(52, 100, 'whole', false),
    4: new Note(54, 100, 'quarter', false),
    8: new Note(57, 100, 'quarter', false),
    12: new Note(54, 100, 'quarter', false),
    16: new Note(52, 100, 'whole', false),
    20: new Note(54, 100, 'quarter', false),
    24: new Note(57, 100, 'quarter', false),
    28: new Note(54, 100, 'quarter', false)
  },
  3: {
    0: new Note(54, 100, 'whole', false)
  },
  4: {
    0: new Note(55, 100, 'whole', false)
  },
  5: {
    0: new Note(57, 100, 'whole', false)
  },
  6: {
    0: new Note(59, 100, 'whole', false)
  },
  7: {
    0: new Note(61, 100, 'whole', false)
  },
  8: {
    0: new Note(62, 100, 'whole', false)
  },
  9: {
    0: new Note(64, 100, 'whole', false)
  },
  10: {
    0: new Note(66, 100, 'whole', false)
  }
};

export default PianoRollData;
