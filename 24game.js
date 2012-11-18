var permutation = require("./permutations")
var calc = require("./calculator")
var _ = require("./lib/underscore-min.js")

// all possible postFix orderings of operators & operands
//
// we have + - * / operators
// for a 4 card-game we have 3 binary operators
// in 4^3 = 64 possible orderings
// interleaved in 4 elements
//
// for example with 2 card-game
// we have a op b or
// we have the following ordering of operators [[+],[-],[*],[/]]
// and [[a,b],[b,a]] orderings or operands
// so we have the permutations of the union of two sets as
// ab+, a+b, +ab, ab-, a-b, -ab, ...
// ba+, b+a, +ba, ...
//
// or with a 3 card-game
// we have the following ordering of operators [[+,+],[+,-],[+,*],[+,/],[-,+],[-,-] ...[/,/]]
// and [[a,b,c],[a,c,b],[b,a,c], ... [c,b,a]] orderings or operands
// so we have the permutations of the union of two sets as
// abc++, ab+c+, a+b+c, ...
//
var postFixOrderings = function(operands, operators) {
	if(operators.length === 0 || operands.length <= 1){
		return permutation.permutation(operands)
	}

	var operatorsChoose = permutation.choose(operators, operands.length-1)
	var orderings = []
	for(var i=0; i<operatorsChoose.length; i++){
		var possibleOrderings = permutation.permutation(operands.concat(operatorsChoose[i]))
		for(var j=0; j<possibleOrderings.length; j++){
			var possibleOrdering = possibleOrderings[j]
			if(calc.isValidPostfix(possibleOrdering)){
				orderings.push(possibleOrdering)		
			}
		}
	}
	return _.uniq(orderings, false, function(val){
		return val.join()
	})
}

var GOAL = 24
var findSolution = function (cards, operators) {
	var solutions = []
	var possibleSolutions = postFixOrderings(cards, operators)
	for(var i=0; i<possibleSolutions.length; i++){
		var result = calc.evaluatePostfix(possibleSolutions[i])
		if(result === GOAL){
			solutions.push(possibleSolutions[i])
		}
	}
	
	return solutions
}

exports.findSolution = findSolution
exports.postFixOrderings = postFixOrderings