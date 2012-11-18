var assert = require("assert")
var permutations = require("../permutations")

describe('Permutations', function(){
	describe('permutation', function(){
	  it('permutation of 1 is 1', function(){
		  assert.deepEqual([[1]], permutations.permutation([1]))
	  })
	  it('permutation of 1,0 is [[1,0],[0,1]]', function(){
		  assert.deepEqual([[1,0],[0,1]], permutations.permutation([1,0]))
	  })
	})
	
	describe('choose', function(){
	    it('choose of 1 is 1', function(){
	  	  assert.deepEqual([[1]], permutations.choose([1],1))
	    })
	    it('choose of 1 2x is 1,1', function(){
	  	  assert.deepEqual([[1,1]], permutations.choose([1],2))
	    })
	    it('choose of +- 2x is  ++ +- -- -+', function(){
	  	  assert.deepEqual([['+','+'],['+','-'],['-','+'],['-','-']], permutations.choose(['+','-'],2))
	    })
  	})
})