'use strict'

const { test } = require('tap')

const filterList = require('../utils/filterList')

const legacyExpansions = require('../legacy-expansions')

const legacyFixtures = {
  national: 10,
  naughty: 8,
  nerds: 3,
  never: 20,
  new: 14,
  nice: 8,
  nifty: 6,
  ninjas: 1,
  ninja: 8,
  no: 30,
  non: 9,
  nobody: 8,
  node: 22,
  not: 9,
  now: 11
}

test('legacy expansions', (t) => {
  /**
   * NOTE: Legacy Expansions
   * We no longer want to add to this list. Adding tests to validate
   * this particular list is not maintainable. Therefore this list
   * will remain the same, and will be folded into the new compiled
   * list which will be tested with rules.
   */
  t.test('compiled shape, never changes', (t) => {
    t.ok(Array.isArray(legacyExpansions), 'should be an array')
    t.equal(legacyExpansions.length, 781, 'should have at least 100 expansions')

    t.end()
  })

  for (const [filter, count] of Object.entries(legacyFixtures)) {
    t.test(`no more "${filter}" phrases`, (t) => {
      const list = filterList(legacyExpansions, filter)
      t.equal(list.length, count)

      t.end()
    })
  }

  t.end()
})
