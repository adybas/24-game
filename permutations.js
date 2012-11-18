var permutation = function(arr) {
	var memo = []
	var permutationRecur = function(left, right) {
		if(right.length === 1) {
			memo.push(left.concat(right))
		} else{
			for(var i=0; i<right.length; i++){
				// for each of the elements in right append to left
				// then recurse on the remaining elements in right
				var newRight = right.slice()
				newRight.splice(i, 1)
				permutationRecur(left.concat(right[i]), newRight)
			}
		}
	}
	permutationRecur([], arr.slice())
	
	return memo
}

var choose = function(arr, n) {
	var memo = []
	if(typeof n !== 'number' || n < 1){
		return null
	}
	var chooseRecur = function(left, right) {
		if(right === 0){
			memo.push(left)
		} else {
			for(var i=0; i<arr.length; i++) {
				chooseRecur(left.concat(arr[i]), right-1)				
			}
		}
	}
	chooseRecur([], n)
	
	return memo
}

exports.permutation = permutation
exports.choose = choose