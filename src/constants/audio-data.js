const defaultAudioData = {
  volume: 0.3,
  intensity: 100,
  mode: 'I'
};

const tempoBounds = {
  min: 6,
  max: 400
};

const volumeBounds = {
  min: 0,
  max: 127
};

const midiBounds = {
  min: 0,
  max: 127
};

const panBounds = {
  min: -127,
  max: 127
};

export default defaultAudioData;
export { tempoBounds, volumeBounds, midiBounds, panBounds };
