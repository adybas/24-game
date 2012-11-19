// postfix evaluation
// supports numbers as operands and +-*/ as operators
// returns null for invalid postfix expression
//
// input: expression as an array, ie
//    expression = [5,6,'*']
//    is the postfix expression 56* = (5 * 6) = 30
//
// Only numbers are supported for operands (not variables)
var evaluatePostfix = function(expression){
	var evalStack = []
	for(var i=0; i<expression.length; i++){
		var next = expression[i]
		
		if(typeof next === 'string'){
			var rightOperand = evalStack.pop();
			var leftOperand = evalStack.pop();
			if(typeof leftOperand !== 'number' || typeof rightOperand !== 'number'){
				return null //invalid postfix expression
			}
			if(next === '+'){
				evalStack.push(leftOperand + rightOperand)
			}else if(next === '-'){
				evalStack.push(leftOperand - rightOperand)
			}else if(next === '*'){
				evalStack.push(leftOperand * rightOperand)
			}else if(next === '/'){
				evalStack.push(leftOperand / rightOperand)
			}
		} else if(typeof next === 'number'){
			evalStack.push(next)
		} else{
			return null //invalid postfix expression
		}
	}
	
	var result = evalStack.pop()
	if(evalStack.length !== 0 || typeof result !== 'number'){
		return null //invalid postfix expression		
	}
	return result
}

// isValidPostfix
// supports numbers as operands and +-*/ as operators
// returns false for invalid postfix expression
// otherwise true
var isValidPostfix = function(expression){
	return evaluatePostfix(expression) !== null
}

exports.evaluatePostfix = evaluatePostfix
exports.isValidPostfix = isValidPostfix