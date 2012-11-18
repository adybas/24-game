var assert = require("assert")
var game = require("../24game")

describe('24 Game', function(){
	describe('postFixOrderings', function(){
		it('postFixOrderings of a is a', function(){
		 assert.deepEqual([['a']], game.postFixOrderings(['a'],[]))
		})
		it('postFixOrderings of a is a, no matter the operators', function(){
		 assert.deepEqual([['a']], game.postFixOrderings(['a'],['+','-']))
		})
		it('postFixOrderings of a,b with + filters out invalid postFix', function(){
		 assert.deepEqual([['a','b','+'],['b','a','+']], game.postFixOrderings(['a','b'],['+']))
		})
		it('postFixOrderings of a,b with +- filters out invalid postFix', function(){
		 	assert.deepEqual([['a','b','+'],['b','a','+'],['a','b','-'],['b','a','-']], game.postFixOrderings(['a','b'],['+','-']))
		})
	})
	
	describe('findSolution', function(){
	  it('12, 12 has a solution for 24', function(){
	 	assert.deepEqual([[12,12,'+']], game.findSolution([12,12], ['+']))
	  })
	  it('6, 4 has a solution for 24', function(){
	 	assert.deepEqual([[6,4,'*'],[4,6,'*']], game.findSolution([6,4], ['+','-','*','/']))
	  })
	  it('4,4,3 has 2 solutions for 24', function(){
	 	assert.deepEqual([[4,4,"+",3,"*"],[3,4,4,"+","*"]], game.findSolution([4,4,3], ['+','-','*','/']))
	  })
	  it('3, 3, 8, 8 has a solution for 24', function(){
		var solution = game.findSolution([3,3,3,8], ['+','-','*','/'])
	 	assert(solution.length > 0)
	  })
	  it('3, 3, 8, 8 has a solution for 24', function(){
		var solution = game.findSolution([3,3,3,8], ['+','-','*','/'])
		// console.log('Solutions for 3, 3, 8, 8',solution)
	 	assert(solution.length > 0)
	  })
	  it('1, 1, 1, 1 has no solutions for 24', function(){
		var solution = game.findSolution([1,1,1,1], ['+','-','*','/'])
	 	assert(solution.length === 0)
	  })
	  it('8, 1, 7, 6 has no solutions for 24', function(){
		var solution = game.findSolution([8,1,7,6], ['+','-','*','/'])
	 	assert(solution.length === 0)
	  })
	})
})