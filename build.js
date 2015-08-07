var fs       = require("fs")
var infile   = __dirname + '/expansions.txt'
var outfile_pre  = __dirname + '/expansions'
var outfile_json = outfile_pre + '.json'
var outfile_txt = outfile_pre + '.txt'

var list = fs
  .readFileSync(infile, 'utf8')
  .split("\n")
  .map(function(e) { return e.trim() })
  .filter(function(e) { return e.length > 0 })
  .filter(function(e) { return e.charAt(0) !== "#" })
  .sort()
  
fs.writeFileSync(outfile_json, JSON.stringify(list, null, 2))

fs.writeFileSync(outfile_txt, list.reduce(
  function(p, c){
    return p + c + '\n'
  })
)

