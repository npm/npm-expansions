var expansions = require("../expansions.js")
var test = require("tap").test
var path = require("path")
var fs = require("fs")

test("expansions", function (t) {
  t.ok(Array.isArray(expansions), "should be an array")
  t.end()
})
