"use strict";

const log = function(a, b, ...props) {
	console.log(a, b, props);
};

log('qwe', 'wer', 123, 'wewe', 1223);

function caclOrDouble(number, ...nums) {
	let res = number;
	if (nums.length > 0) {
		for (let num of nums) {
			res *= num;
		}
	}
	else res *= res;
	return res;
};
console.log(caclOrDouble(3,2,3,2,2,2,2,2,2,2));