'use strict'

const fs = require('fs')
const { join } = require('path')
const { test } = require('tap')

const FIXTURE_DIR = join(__dirname, 'fixtures')
const listFromFile = require('../../utils/listFromFile')

test('readTextFile', (t) => {
  t.test('is function', (t) => {
    t.equal(typeof listFromFile, 'function')

    t.end()
  })

  t.test('returns array', (t) => {
    const file = join(FIXTURE_DIR, 'regular.txt')
    const expectedFile = fs.readFileSync(file, 'utf8')
    const expectedLength = expectedFile.split('\n').length

    const result = listFromFile(file)
    t.ok(Array.isArray(result))
    t.equal(expectedLength, result.length)

    t.end()
  })

  t.test('removes lines starting with # symbol', (t) => {
    const file = join(FIXTURE_DIR, 'bad-symbol.txt')
    const expectedFile = fs.readFileSync(file, 'utf8')
    const expectedLength = expectedFile
      .split('\n')
      .filter((f) => f.charAt(0) !== '#')
      .length

    const result = listFromFile(file)
    t.ok(Array.isArray(result))
    t.equal(expectedLength, result.length)

    t.end()
  })

  t.test('removes empty lines', (t) => {
    const file = join(FIXTURE_DIR, 'empty-line.txt')
    const expectedFile = fs.readFileSync(file, 'utf8')
    const expectedLength = expectedFile
      .split('\n')
      .filter((f) => f.length > 0)
      .length

    const result = listFromFile(file)
    t.ok(Array.isArray(result))
    t.equal(expectedLength, result.length)

    t.end()
  })

  t.test('trims white space from lines', (t) => {
    const file = join(FIXTURE_DIR, 'line-trim.txt')
    const expectedFile = fs.readFileSync(file, 'utf8')
    const expectedString = 'that has space'
    const expectedLength = expectedFile
      .split('\n')
      .map((f) => f.trim())
      .length

    const result = listFromFile(file)
    t.ok(Array.isArray(result))
    t.equal(expectedLength, result.length)
    t.equal(expectedString, result[1])

    t.end()
  })

  t.end()
})
