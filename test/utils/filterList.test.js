'use strict'

const fs = require('fs')
const { join } = require('path')
const { test } = require('tap')

const FIXTURE_DIR = join(__dirname, 'fixtures')
const filterList = require('../../utils/filterList')
const listFromFile = require('../../utils/listFromFile')

test('filterList', (t) => {
  t.test('is function', (t) => {
    t.equal(typeof filterList, 'function')

    t.end()
  })

  t.test('returns array', (t) => {
    const expectedList = ['hello', 'world']
    const result = filterList(['hello', 'world'], '')
    t.ok(Array.isArray(result))
    t.equal(expectedList.length, result.length)

    t.end()
  })

  t.test('filters string items that contain whole world', (t) => {
    const file = join(FIXTURE_DIR, 'filter-list.txt')
    const expectedString = 'cat ninjas'
    const actualList = listFromFile(file)

    const result = filterList(actualList, 'cat')
    t.ok(Array.isArray(result))
    t.equal(result.length, 1)
    t.equal(expectedString, result[0])

    t.end()
  })

  t.test('filters string items; any position', (t) => {
    const file = join(FIXTURE_DIR, 'filter-list.txt')
    const expectedString = 'over lazy dog'
    const actualList = listFromFile(file)

    const result = filterList(actualList, 'dog')
    t.ok(Array.isArray(result))
    t.equal(result.length, 1)
    t.equal(expectedString, result[0])

    t.end()
  })

  t.test('filters string items; ignores case', (t) => {
    const file = join(FIXTURE_DIR, 'filter-list.txt')
    const expectedString = 'quick brown FOX'
    const actualList = listFromFile(file)

    const result = filterList(actualList, 'fox')
    t.ok(Array.isArray(result))
    t.equal(result.length, 1)
    t.equal(expectedString, result[0])

    t.end()
  })

  t.end()
})
