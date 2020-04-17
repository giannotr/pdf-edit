// slower version
/*
function hash(input) {
  const _input = input + '';
  let hash = 0, i, chr;

  for (i = 0; i < _input.length; i++) {
    chr   = _input.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}
*/

export function hash32(input) {
  const _input = input + '';

  return _input.split('')
    .reduce((x, y) => {
      const z = ((x << 5) - x) + y.charCodeAt(0);
      return z & z;
    },
    0
  );
}

function hash(input) {
  const _h0 = hash32(input);
  return _h0 + hash32(_h0 + input);
}

export default hash;
