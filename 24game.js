var permutation = require("./permutations")
	,calc = require("./calculator")
	,_ = require("./lib/underscore-min.js");

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
var postFixOrderings = function(operands, operators, skipCheckIsValid) {
	if(operators.length === 0 || operands.length <= 1){
		return permutation.permutation(operands);
	}

	var allPlus = [];
	_(operands.length-1).times(function(n){ allPlus.push('+') });
	var allTimes = [];
	_(operands.length-1).times(function(n){ allTimes.push('*') });
	var operatorsChoose = permutation.choose(operators, operands.length-1);
	var result = [];
	for(var i=0; i<operatorsChoose.length; i++){
		var curOperators = operatorsChoose[i];
		var possibleOrderings;
		
		// additive associativity abcd+++ is equivalent to any placement of +
		// when all operators are +
		if(_.isEqual(allPlus, curOperators)){
			var operandsForPlus = permutation.permutation(operands);
			possibleOrderings = _.map(operandsForPlus, function(e){ 
				return e.concat(allPlus); 
			});
		// multiplicitive associativity abcd*** is equivalent to any placement of *
		// when all operators are *
		} else if(_.isEqual(allTimes, curOperators)){
			var operandsForTimes = permutation.permutation(operands);
			possibleOrderings = _.map(operandsForTimes, function(e){ 
				return e.concat(allTimes); 
			});
		} else {
			// compute all possible orderings
			possibleOrderings = permutation.permutation(operands.concat(curOperators));
		}
		
		// add valid orderings to result
		for(var j=0; j<possibleOrderings.length; j++){
			var possibleOrdering = possibleOrderings[j]
			if(skipCheckIsValid){
				result.push(possibleOrdering);				
			} else if(calc.isValidPostfix(possibleOrdering)){
				result.push(possibleOrdering);	
			}
		}			
	}
	
	return result;
}

var GOAL = 24;
var findSolution = function (cards, operators) {
	var solutions = [],
		possibleSolutions = postFixOrderings(cards, operators, true);
	for(var i=0; i<possibleSolutions.length; i++){
		var result = calc.evaluatePostfix(possibleSolutions[i]);
		if(result && result === GOAL){
			solutions.push(possibleSolutions[i]);
		}
	}
	
	return _.uniq(solutions, false, function(val){
		return val.join()
	})
}

var hasSolution = function(cards, operators) {
	var possibleSolutions = postFixOrderings(cards, operators);
	for(var i=0; i<possibleSolutions.length; i++){
		var result = calc.evaluatePostfix(possibleSolutions[i]);
		if(result === GOAL){
			return true;
		}
	}

	return false;
}

exports.findSolution = findSolution;
exports.postFixOrderings = postFixOrderings;
exports.hasSolution = hasSolution;