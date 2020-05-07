const parseToRgba = (hexString, opacity) => {
  var bigint = parseInt(hexString.substr(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return `rgba(${r},${g},${b},${opacity})`;
};

export { parseToRgba };
