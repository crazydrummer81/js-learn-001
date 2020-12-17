'use strict';

let k = 25;
setTimeout(() => {
	for (let i = 0; i < 10000; i++) {
		k /= 2;
		console.log('done for 8');
	};
},0);

let l = 25;
setTimeout(() => {
	for (let i = 0; i < 5000; i++) {
		k /= 2;
		console.log('done for 4');
	};
},0);


console.log('done');