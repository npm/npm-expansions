#!/usr/bin/env node

var fs = require("fs")
var list = JSON.parse(fs.readFileSync("../index.json"));

list.sort(function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
})

fs.writeFileSync("../index.json", JSON.stringify(list, null, 2) + "\n")
