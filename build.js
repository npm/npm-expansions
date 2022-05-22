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

fs.writeFileSync(outfile_json, JSON.stringify(list, null, 2));

fs.writeFileSync(outfile_txt, list.reduce((p, c) => `${p + c}\n`, `${list.shift()}\n`));
// reappend the instructions
fs.appendFileSync(
  outfile_txt,
  '#\n'
  + "# please don't add your expansions down here!\n"
  + '# insert them in alphabetical order to help reduce merge conflicts.\n'
  + '#\n'
  + '# <3\n',
);
