// Conversion from MIDI pitch codes to frequencies in Hz
const frequency = [
  8.176,
  8.662,
  9.177,
  9.723,
  10.301,
  10.913,
  11.562,
  12.25,
  12.978,
  13.75,
  14.568,
  15.434,
  16.352,
  17.324,
  18.354,
  19.445,
  20.602,
  21.827,
  23.125,
  24.5,
  25.957,
  27.5,
  29.135,
  30.868,
  32.703,
  34.648,
  36.708,
  38.891,
  41.203,
  43.654,
  46.249,
  48.999,
  51.913,
  55.0,
  58.27,
  61.735,
  65.406,
  69.296,
  73.416,
  77.782,
  82.407,
  87.307,
  92.499,
  97.999,
  103.826,
  110.0,
  116.541,
  123.471,
  130.813,
  138.591,
  146.832,
  155.563,
  164.814,
  174.614,
  184.997,
  195.998,
  207.652,
  220.0,
  233.082,
  246.942,
  261.626,
  277.183,
  293.665,
  311.127,
  329.628,
  349.228,
  369.994,
  391.995,
  415.305,
  440.0,
  466.164,
  493.883,
  523.251,
  554.365,
  587.33,
  622.254,
  659.255,
  698.456,
  739.989,
  783.991,
  830.609,
  880.0,
  932.328,
  987.767,
  1046.502,
  1108.731,
  1174.659,
  1244.508,
  1318.51,
  1396.913,
  1479.978,
  1567.982,
  1661.219,
  1760.0,
  1864.655,
  1975.533,
  2093.005,
  2217.461,
  2349.318,
  2489.016,
  2637.02,
  2793.826,
  2959.955,
  3135.963,
  3322.438,
  3520.0,
  3729.31,
  3951.066,
  4186.009,
  4434.922,
  4698.636,
  4978.032,
  5274.041,
  5587.652,
  5919.911,
  6271.927,
  6644.875,
  7040.0,
  7458.62,
  7902.133,
  8372.018,
  8869.844,
  9397.273,
  9956.063,
  10548.082,
  11175.303,
  11839.822,
  12543.854
];

// Conversion from MIDI pitch codes to frequencies in Hz
const toPenta = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  21,
  21,
  21,
  24,
  24,
  26,
  26,
  28,
  28,
  28,
  31,
  31,
  33,
  33,
  33,
  36,
  36,
  38,
  38,
  40,
  40,
  40,
  43,
  43,
  45,
  45,
  45,
  48,
  48,
  50,
  50,
  52,
  52,
  52,
  55,
  55,
  57,
  57,
  57,
  60,
  60,
  62,
  62,
  64,
  64,
  64,
  67,
  67,
  69,
  69,
  69,
  72,
  72,
  74,
  74,
  76,
  76,
  76,
  79,
  79,
  81,
  81,
  81,
  84,
  84,
  86,
  86,
  88,
  88,
  88,
  91,
  91,
  93,
  93,
  93,
  96,
  96,
  98,
  98,
  100,
  100,
  100,
  103,
  103,
  105,
  105,
  105,
  108,
  108,
  110,
  110,
  112,
  112,
  112,
  115,
  115,
  117,
  117,
  117,
  120,
  120,
  122,
  122,
  124,
  124,
  124,
  127
];

const volume = [
  0.0,
  0.0,
  0.001,
  0.003,
  0.005,
  0.008,
  0.011,
  0.015,
  0.02,
  0.025,
  0.031,
  0.037,
  0.044,
  0.052,
  0.06,
  0.068,
  0.077,
  0.087,
  0.097,
  0.107,
  0.118,
  0.13,
  0.141,
  0.153,
  0.166,
  0.179,
  0.192,
  0.205,
  0.219,
  0.233,
  0.247,
  0.261,
  0.276,
  0.29,
  0.305,
  0.32,
  0.335,
  0.35,
  0.365,
  0.381,
  0.396,
  0.411,
  0.426,
  0.441,
  0.457,
  0.472,
  0.486,
  0.501,
  0.516,
  0.531,
  0.545,
  0.559,
  0.573,
  0.587,
  0.601,
  0.614,
  0.628,
  0.641,
  0.653,
  0.666,
  0.678,
  0.69,
  0.702,
  0.714,
  0.725,
  0.736,
  0.746,
  0.757,
  0.767,
  0.777,
  0.786,
  0.796,
  0.805,
  0.813,
  0.822,
  0.83,
  0.838,
  0.845,
  0.853,
  0.86,
  0.867,
  0.873,
  0.88,
  0.886,
  0.892,
  0.897,
  0.903,
  0.908,
  0.913,
  0.917,
  0.922,
  0.926,
  0.93,
  0.934,
  0.938,
  0.942,
  0.945,
  0.948,
  0.951,
  0.954,
  0.957,
  0.96,
  0.962,
  0.965,
  0.967,
  0.969,
  0.971,
  0.973,
  0.975,
  0.976,
  0.978,
  0.979,
  0.981,
  0.982,
  0.983,
  0.984,
  0.986,
  0.987,
  0.988,
  0.988,
  0.989,
  0.99,
  0.991,
  0.991,
  0.992,
  0.993,
  0.993,
  0.994
];

export { frequency, toPenta, volume };