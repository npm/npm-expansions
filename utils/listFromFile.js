'use strict'

const fs = require('fs')

/**
 * Generate list from each line of a file
 *
 * @param {string} filename string path to file
 * @returns {string[]} list of string
 */
module.exports = function listFromFile (filename) {
  return fs
    .readFileSync(filename, 'utf8')
    .split('\n')
    .map((e) => e.trim())
    .filter((e) => e.length > 0)
    .filter((e) => e.charAt(0) !== '#')
}
