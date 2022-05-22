/* eslint-disable camelcase */
const fs = require('fs');

const infile = `${__dirname}/expansions.txt`;
const outfile_pre = `${__dirname}/expansions`;
const outfile_json = `${outfile_pre}.json`;
const outfile_txt = `${outfile_pre}.txt`;

const list = fs
  .readFileSync(infile, 'utf8')
  .split('\n')
  .map((e) => e.trim())
  .filter((e) => (e.length > 0))
  .filter((e) => e.charAt(0) !== '#')
  .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

const distinct = [...new Set(list)];

fs.writeFileSync(outfile_json, JSON.stringify(distinct, null, 2));

fs.writeFileSync(outfile_txt, distinct.reduce((p, c) => `${p + c}\n`, `${distinct.shift()}\n`));

// reappend the instructions
fs.appendFileSync(
  outfile_txt,
  '#\n'
  + "# please don't add your expansions down here!\n"
  + '# insert them in alphabetical order to help reduce merge conflicts.\n'
  + '#\n'
  + '# <3\n',
);
