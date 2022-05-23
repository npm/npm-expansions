// https://www.fileformat.info/convert/text/upside-down-map.htm

const flipTable = {
  a: '\u0250',
  b: 'q',
  c: '\u0254',
  d: 'p',
  e: '\u01DD',
  f: '\u025F',
  g: '\u0183',
  h: '\u0265',
  i: '\u1D09',
  j: '\u027E',
  k: '\u029E',
  m: '\u026F',
  n: 'u',
  r: '\u0279',
  t: '\u0287',
  v: '\u028C',
  w: '\u028D',
  y: '\u028E',
  A: '\u2200',
  C: '\u0186',
  E: '\u018E',
  F: '\u2132',
  G: '\u05E4',
  H: 'H',
  I: 'I',
  J: '\u017F',
  L: '\u02E5',
  M: 'W',
  N: 'N',
  P: '\u0500',
  T: '\u2534',
  U: '\u2229',
  V: '\u039B',
  Y: '\u2144',
  1: '\u0196',
  2: '\u1105',
  3: '\u0190',
  4: '\u3123',
  5: '\u03DB',
  6: '9',
  7: '\u3125',
  8: '8',
  9: '6',
  0: '0',
  '.': '\u02D9',
  ',': "'",
  "'": ',',
  '"': ',,',
  '`': ',',
  '?': '\u00BF',
  '!': '\u00A1',
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  '&': '\u214B',
  _: '\u203E',
  '\u2234': '\u2235',
  '\u2045': '\u2046',
};

for (const [idx, entry] of Object.entries(flipTable)) {
  flipTable[entry] = idx;
}

function normalize(str) {
  // https://stackoverflow.com/a/37511463/10629176
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function flipString(str) {
  const last = str.length - 1;
  // Thanks to Brook Monroe for the
  // suggestion to use Array.join
  const result = new Array(str.length);
  for (let i = last; i >= 0; i -= 1) {
    const c = str.charAt(i);
    const r = flipTable[c];
    result[last - i] = r !== undefined ? r : c;
  }
  return result.join('');
}

function countNonAscii(str) {
  return str.match(/[^ -~]/g)?.length ?? 0;
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function unflip(str) {
  const flipped = flipString(str);
  const notFlipped = str;
  const flippedAndReversed = reverse(flipped);
  const notFlippedAndReversed = reverse(notFlipped);

  // Current is [str, cost], find lowest
  const res = [flipped, notFlipped, flippedAndReversed, notFlippedAndReversed].reduce((p, c) => {
    const cost = countNonAscii(c);
    if (cost < p[1]) {
      return [c, cost];
    }
    return p;
  }, ['', Infinity])[0];

  return res;
}

function unreverse(str) {
  // Currently the algorithm checks capitalization
  if ((str.match(/[A-Z][a-z]/g)?.length ?? 0) >= (str.match(/[a-z][A-Z]/g)?.length ?? 0)) {
    return str;
  }
  return reverse(str);
}

module.exports = {
  unflip,
  reverse,
  unreverse,
  normalize,
};
