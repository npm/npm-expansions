'use strict'

const { join } = require('path')
const fs = require('fs')

const listFromFile = require('./utils/listFromFile')

const infile = join(__dirname, 'expansions.txt')
const outfilePre = join(__dirname, 'expansions')
const outfileJson = `${outfilePre}.json`
const outfileTxt = `${outfilePre}.txt`

const legacyFile = require('./legacy-expansions')

const userSubmissions = listFromFile(infile)
const list = []
  .concat(userSubmissions)
  .concat(legacyFile)
  .sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

fs.writeFileSync(outfileJson, JSON.stringify(list, null, 2))

fs.writeFileSync(outfileTxt, userSubmissions.join('\n'))

// Reappend the instructions
const instructions = `

######################################################################
#                                                                    #
# Please add your expansions to this file; above this instruction    #
# block. Please run \`npm test\` locally before submitting a           #
# pull-request to see if everything checks out. The process for      #
# adding expansions is completely automated now, so if \`npm test\`    #
# passes, then your pull-request is very likely to be automatically  #
# accepted!                                                          #
#                                                                    #
# <3 npm team                                                        #
######################################################################
`
fs.appendFileSync(outfileTxt, instructions)
