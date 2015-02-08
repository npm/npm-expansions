require('should');
var expansions = require('../index');

sortExpansionList = function(list){
  list.sort(function (a, b){
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
};

describe('index.json', function(){
  it('should be alphabetized', function(){
    expansionsClone = expansions.slice(0);
    sortExpansionList(expansionsClone);
    expansionsClone.should.eql(expansions);
  });

  it('should not contain duplicates', function(){
    expansionsClone = expansions.slice(0);
    sortExpansionList(expansionsClone);
    for (var i = 0; i < expansionsClone.length - 1; i++) {
      if (expansionsClone[i + 1].toLowerCase() == expansionsClone[i].toLowerCase()) {
        throw new Error('"' + expansionsClone[i] + '" is duplicated');
      }
    }
  });
});

// These expansions don't really follow the rules, but we don't want to
// remove them.
exemptedExpansions = [
  "Non-Potable Macchiato",
  "Non-Printable Material"
];

textExpansion = function(expansion){
  describe('"' + expansion + '"', function(){
    it('should be a string', function(){
      expansion.should.be.type('string');
    });

    it('should be an expansion of "npm"', function(){
        for (var i = 0; i < exemptedExpansions.length; ++i) {
          if (expansion == exemptedExpansions[i]) return;
        }
        expansion.should.match(
          /^N[^\s]+\s(?:of |the |a )*P[^\s]+\s(?:of |the |a )*M[^\s]+$/i
        );
    });
  });
};

for (var i = 0; i < expansions.length; ++i) {
  textExpansion(expansions[i]);
}
