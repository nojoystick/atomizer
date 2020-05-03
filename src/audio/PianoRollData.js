import Note from './Note';

const PianoRollData = {
  1: {
    0: [new Note(0, 100, 'quarter', false)],
    4: [new Note(3, 100, 'quarter', false)],
    8: [new Note(5, 100, 'quarter', false)],
    12: [new Note(3, 100, 'quarter', false)]
  },
  2: {
    0: [new Note(0, 100, 'whole', false)],
    2: [new Note(3, 100, 'quarter', false)],
    4: [new Note(5, 100, 'quarter', false)],
    6: [new Note(3, 100, 'quarter', false)],
    8: [new Note(7, 100, 'whole', false)],
    10: [new Note(5, 100, 'quarter', false)],
    12: [new Note(3, 100, 'quarter', false)],
    14: [new Note(5, 100, 'quarter', false)]
  }
};

/**
 * For saving to firebase
 */
export const transformToPureObject = pianoRoll => {
  Object.values(pianoRoll).forEach(element => {
    Object.keys(element).forEach(key => {
      const arrToReplace = element[key];
      element[key] = [];
      arrToReplace.forEach(note => {
        element[key].push(Object.assign({}, note));
      });
    });
  });
  return pianoRoll;
};

/**
 * For saving a single element to firebase
 */
export const transformElementToPureObject = element => {
  if (!element) {
    return [];
  }
  Object.keys(element).forEach(key => {
    const arrToReplace = element[key];
    element[key] = [];
    arrToReplace.forEach(note => {
      element[key].push(Object.assign({}, note));
    });
  });
  return element;
};

export default PianoRollData;
