'use stict'

const { join } = require('path')
const { test } = require('tap')

const expansions = require('../expansions.json')

const listFromFile = require('../utils/listFromFile')
const filterList = require('../utils/filterList')
// const exceptions = require('../exceptions')

const FIXTURE_DIR = join(__dirname, 'fixtures')

test('expansions', (t) => {
  t.test('compiled shape', (t) => {
    t.ok(Array.isArray(expansions), 'should be an array')
    t.ok((expansions.length > 781), 'should have more than legacy count')

    t.end()
  })

  t.test('no duplicates', (t) => {
    const hash = {}
    for (let x = 0; x < expansions.length; x++) {
      const key = expansions[x]
      t.notOk(hash[key], `Duplicate Found: ${key}`)
      hash[key] = true
    }

    t.end()
  })

  t.test('no bad words', (t) => {
    const badWordFile = join(FIXTURE_DIR, 'bad-words.txt')
    const badWords = listFromFile(badWordFile)

    for (let x = 0; x < badWords.length; x++) {
      const explicit = badWords[x]
      const list = filterList(expansions, explicit)
      if (list.length) {
        console.log('LIST:', list)
      }

      t.ok(list.length === 0, `no explicit values; no bad words (${explicit})`)
    }

    t.end()
  })

  t.end()
})
