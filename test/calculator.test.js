var assert = require("assert")
var calc = require("../calculator")

describe('calculator', function(){
  describe('evaluatePostfix', function(){
    it('1 is (1) = 1', function(){
	  assert.equal(1, calc.evaluatePostfix([1]))
    })
    it('11+ is (1 + 1) = 2', function(){
	  assert.equal(2, calc.evaluatePostfix([1, 1, '+']))
	  assert.equal(5, calc.evaluatePostfix([2, 3, '+']))
	  assert.equal(4, calc.evaluatePostfix([1, 3, '+']))
    })
    it('24/ is different from 42/', function(){
	  assert.equal(0.5, calc.evaluatePostfix([2, 4, '/']))
	  assert.equal(2, calc.evaluatePostfix([4, 2, '/']))
    })
    it('(2+3)*(10-2)/(4+4) = 2 3 + 10 2 - * 4 4 + / = 5', function(){
	  assert.equal(5, calc.evaluatePostfix([2,3,'+',10,2,'-','*',4,4,'+','/']))
    })
    it('invalids', function(){
	  assert.equal(null, calc.evaluatePostfix(['+']))
	  assert.equal(null, calc.evaluatePostfix([1,2]))
	  assert.equal(null, calc.evaluatePostfix(['+',2]))
	  assert.equal(null, calc.evaluatePostfix(['+',1,2]))
    })
  })

  describe('isValidPostfix', function(){
    it('invalids', function(){
	  assert.equal(false, calc.isValidPostfix(['+']))
	  assert.equal(false, calc.isValidPostfix([1,2]))
	  assert.equal(false, calc.isValidPostfix(['+',2]))
	  assert.equal(false, calc.isValidPostfix(['+',1,2]))
    })
    it('valids', function(){
	  assert.equal(true, calc.isValidPostfix([1]))
	  assert.equal(true, calc.isValidPostfix([1,2,'+']))
    })
  })
})