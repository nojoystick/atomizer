/**
 * Custom curve, linearValueAtTime can't be cancelled midway through
 * @param {*} start
 * @param {*} end
 */
export function expCurve(start, end) {
  var count = 10;
  var t = 0;
  var curve = new Float32Array(count + 1);
  start = Math.max(start, 0.0000001);
  end = Math.max(end, 0.0000001);
  for (var i = 0; i <= count; ++i) {
    curve[i] = start * Math.pow(end / start, t);
    t += 1 / count;
  }
  return curve;
}
