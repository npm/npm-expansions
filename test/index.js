var expansions = require("..")
var test = require("tap").test

test("expansions", function (t) {
  t.ok(Array.isArray(expansions), "should be an array")
  t.ok((expansions.length > 100), "should have at least 100 expansions")
  t.end()
})
