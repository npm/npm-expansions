var fs       = require("fs")
var infile   = __dirname + '/expansions.txt'
var outfile  = __dirname + '/expansions.json'

var list = fs
  .readFileSync(infile, 'utf8')
  .split("\n")
  .map(function(e) { return e.trim() })
  .filter(function(e) { return e.length > 0 })
  .filter(function(e) { return e.charAt(0) !== "#" })
  .sort()

fs.writeFileSync(outfile, JSON.stringify(list, null, 2))
