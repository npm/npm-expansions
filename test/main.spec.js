const fs = require('fs');

const { test } = require('tap');

const { unflip, unreverse, normalize } = require('./util');

const expansions = require('../expansions.json');

test('expansions', (t) => {
  t.ok(Array.isArray(expansions), 'should be an array');
  t.end();
});

test('should be sorted', (t) => {
  if (!expansions.reduce(
    (n, item) => (
      n !== null
       && n.toLowerCase().localeCompare(item.toLowerCase()) === 1 ? null : item),
    '',
  )) {
    t.fail('expansions are not sorted');
  }
  t.end();
});

const ignoredWords = [
  // determiners
  'a',
  'an',
  'the',

  // pronouns
  'I',
  'you',
  'he',
  'she',
  'it',
  'we',
  'they',
  'me',
  'him',
  'her',
  'us',
  'them',
  'myself',
  'yourself',
  'himself',
  'herself',
  'itself',
  'ourselves',
  'yourselves',
  'themselves',
  'my',
  'your',
  'his',
  'her',
  'its',
  'our',
  'their',

  // Prepositions
  'aboard',
  'about',
  'above',
  'across',
  'after',
  'against',
  'along',
  'amid',
  'among',
  'anti',
  'around',
  'as',
  'at',
  'before',
  'behind',
  'below',
  'beneath',
  'beside',
  'besides',
  'between',
  'beyond',
  'but',
  'by',
  'concerning',
  'considering',
  'despite',
  'down',
  'during',
  'except',
  'excepting',
  'excluding',
  'following',
  'for',
  'from',
  'in',
  'inside',
  'into',
  'like',
  'minus',
  'near',
  'of',
  'off',
  'on',
  'onto',
  'opposite',
  'outside',
  'over',
  'past',
  'per',
  'plus',
  'regarding',
  'round',
  'save',
  'since',
  'than',
  'through',
  'to',
  'toward',
  'towards',
  'under',
  'underneath',
  'unlike',
  'until',
  'up',
  'upon',
  'versus',
  'via',
  'with',
  'within',
  'without',

  // Conjunctions
  'for',
  'and',
  'nor',
  'but',
  'or',
  'yet',
  'so',
  'Conjunctions Concession',
  'though',
  'although',
  'even though',
  'while',
  'Conjunctions Condition',
  'if',
  'only if',
  'unless',
  'until',
  'provided that',
  'assuming that',
  'even if',
  'in case (that)',
  'lest',
  'Conjunctions Comparison',
  'than',
  'rather than',
  'whether',
  'as much as',
  'whereas',
  'Conjunctions Time',
  'after',
  'as long as',
  'as soon as',
  'before',
  'by the time',
  'now that',
  'once',
  'since',
  'till',
  'until',
  'when',
  'whenever',
  'while',
  'because',
  'since',
  'so that',
  'in order to',
  'why',
  'that',
  'what',
  'whatever',
  'which',
  'whichever',
  'who',
  'whoever',
  'whom',
  'whomever',
  'whose',
  'how',
  'as though',
  'as if',
  'where',
  'wherever',
].map((v) => new RegExp(`\\s+${v}\\s+`, 'g'));

// Create a computer friendly readable version using existing conventions and customized logic
// Final result must contain a single space separated list
const npmSentences = expansions
  // Unflip everything
  .map(unflip)
  .map(normalize)
  .map(unreverse)
  // conjunctions and prepositions
  .map((v) => {
    for (const word of ignoredWords) {
      // eslint-disable-next-line no-param-reassign
      v = v.replace(word, ' ');
    }
    return v;
  })
  .map((sentence) => sentence
    // Things inside ()
    .replace(/\s\([^)]+\)/g, '')
    // punctuations
    .replace(/[,.] /i, ' ')
    // punctuations in front of words
    .replace(/(?:(?!\s)\W)+(\w)/i, (_, g1) => g1.toUpperCase())
    // N...P...M with lowercases or punctuation in between
    .replace(/(N[a-z]*)(?:(?!\s)\W)?P/, '$1 P')
    .replace(/(P[a-z]*)(?:(?!\s)\W)?M/, '$1 M'));

test('no duplicates', (t) => {
  const hash = Object.create(null);

  for (let x = 0; x < expansions.length; x += 1) {
    const sentence = expansions[x];
    t.notOk(hash[sentence] !== undefined, `Duplicate Found in line ${x + 1}: ${sentence}`);
    hash[sentence] = true;
  }

  t.end();
});

test('conventions', (t) => {
  for (const sentence of npmSentences) {
    for (const [patternName, antiRegex] of [
      ['double space', / {2}/],
      ['incorrect punctuation', /\s[^\w]/],
    ]) {
      t.notOk(sentence.match(antiRegex), `${sentence} should not match ${patternName}`);
    }
  }
  t.end();
});

test('no bad words', (t) => {
  const badWords = fs.readFileSync('./test/bad-words.txt', 'utf-8').split(/\r?\n/).map((v) => v.toLowerCase());

  for (const badWord of badWords) {
    const list = expansions.filter((exp) => normalize(exp) === badWord);

    t.notOk(list.length > 0, `Bad word ${badWord} was found in ${list.join(', ')}`);
  }

  t.end();
});

test('all expansions should follow NPM', (t) => {
  for (const [line, sentence] of Object.entries(npmSentences)) {
    const words = sentence.split(/ /g);

    // Check for word length
    t.notOk(words.length > 3, `Phrase should only be 3 words split by single spaces, got ${words.length}: ${sentence}`);

    // Check if it i N... P... M...
    words.forEach((rawWord, idx) => {
      const word = rawWord.toLowerCase();
      t.notOk(!word.startsWith('npm'[idx]), `New sentence does not follow NPM: ${word} does not start with ${'npm'[idx]} in sentence ${sentence} line: ${1 - -line}`);
    });
  }
  t.end();
});
