#!/usr/bin/env node

var fs = require("fs")
var path = require("path")
var textPath = path.join(__dirname, '..', 'EXPANSIONS-EDIT-ME.txt')
fs.readFile(textPath, function (err, textBuf) {
  if (err) {
    return console.log('Error happened while opening file ', err)
  }
  list = textBuf.toString().split("\n").slice(0, -1)
  fs.writeFileSync("./index.json", JSON.stringify(list, null, 2) + "\n")
})
