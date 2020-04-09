import { volume } from '../constants/frequencies';

const lengthMap = {
  sixteenth: 1,
  eighth: 2,
  quarter: 4,
  half: 8,
  whole: 16
};

class Note {
  /**
   *
   * @param {*} pitch - scale degree of the note to play
   * @param {*} velocity - MIDI velocity to play it at
   * @param {*} length - string between 'sixteenth' and 'whole'
   * @param {*} dotted - boolean, is it a dotted note
   */
  constructor(pitch, vol, length, dotted) {
    this.pitch = pitch;
    this.volume = volume[vol];
    this.length = lengthMap[length] + (dotted && length !== 'whole' && lengthMap[length] / 2);
  }
}

export default Note;
