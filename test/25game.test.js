var assert = require("assert")
var game = require("../24game")

describe('24 Game', function(){
	describe('postFixOrderings', function(){
		it('postFixOrderings of 1 is 1', function(){
		 assert.deepEqual([[1]], game.postFixOrderings([1],[]))
		})
		it('postFixOrderings of 1 is 1, no matter the operators', function(){
		 assert.deepEqual([[1]], game.postFixOrderings([1],['+','-']))
		})
		it('postFixOrderings of 1,2 with + filters out invalid postFix', function(){
		 assert.deepEqual([[1,2,'+'],[2,1,'+']], game.postFixOrderings([1,2],['+']))
		})
		it('postFixOrderings of 1,2 with +- filters out invalid postFix', function(){
		 	assert.deepEqual([[1,2,'+'],[2,1,'+'],[1,2,'-'],[2,1,'-']], game.postFixOrderings([1,2],['+','-']))
		})
		it('postFixOrderings of 1,2,3 with + only returns 1 possible placement of +', function(){
		 	assert.deepEqual([ [ 1, 2, 3, '+', '+' ],
			  [ 1, 3, 2, '+', '+' ],
			  [ 2, 1, 3, '+', '+' ],
			  [ 2, 3, 1, '+', '+' ],
			  [ 3, 1, 2, '+', '+' ],
			  [ 3, 2, 1, '+', '+' ] ], game.postFixOrderings([1,2,3],['+']))
		})
		it('postFixOrderings of 1,2,3 with * only returns 1 possible placement of *', function(){
		 	assert.deepEqual([ [ 1, 2, 3, '*', '*' ],
			  [ 1, 3, 2, '*', '*' ],
			  [ 2, 1, 3, '*', '*' ],
			  [ 2, 3, 1, '*', '*' ],
			  [ 3, 1, 2, '*', '*' ],
			  [ 3, 2, 1, '*', '*' ] ], game.postFixOrderings([1,2,3],['*']))
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
	 	assert(game.findSolution([3,3,3,8], ['+','-','*','/']).length > 0)
	  })
	  it('1, 1, 1, 1 has no solutions for 24', function(){
	 	assert(game.findSolution([1,1,1,1], ['+','-','*','/']).length === 0)
	  })
	  it('8, 1, 7, 6 has no solutions for 24', function(){
	 	assert(game.findSolution([8,1,7,6], ['+','-','*','/']).length === 0)
	  })
	})
	
	describe('hasSolution', function(){
	  it('12, 12 has a solution for 24', function(){
	 	assert(game.hasSolution([12,12], ['+']))
	  })
	  it('3, 3, 8, 8 has a solution for 24', function(){
	 	assert(game.hasSolution([3,3,3,8], ['+','-','*','/']))
	  })
	  it('8, 1, 7, 6 has no solutions for 24', function(){
	 	assert(!game.hasSolution([8,1,7,6], ['+','-','*','/']))
	  })
	})
})