#!/usr/bin/env node

var fs = require("fs")
var expansions = fs
  .readFileSync("./expansions.txt", "utf-8")
  .split("\n")
  .filter(function(e){
    return e.length;
  })
  .sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

var lines = [
  "/*",
  "",
  "  *****  THIS FILE IS GENERATED BY ROBOTS  *****",
  "",
  "  If you're a human, edit expansions.txt instead",
  "",
  "*/",
  "",
  "module.exports = " + JSON.stringify(expansions, null, 2),
  ""
]

fs.writeFileSync("./expansions.js",  lines.join("\n"))
