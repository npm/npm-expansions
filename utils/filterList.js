'use strict'

/**
 * Filter list of strings by passed in filter value
 *
 * @param {string[]} list list of string items to filter
 * @param {string} filter filter to apply against list of strings
 * @returns {string[]} filtered list
 */
module.exports = function filterList (list, filter) {
  return list.filter(
    (item) => {
      // INFO: set word boundary with `\\b` (escape slash with `\`)
      const matcher = new RegExp(`\\b${filter}\\b`)
      const match = item.toLowerCase().match(matcher)
      // // TESTING // BEGIN
      // if (match) {
      //   console.log('match:', match)
      //   return match[0] === filter
      // }
      // return false
      // // TESTING // END
      return (match)
        ? match[0] === filter
        : false
    }
  )
}
