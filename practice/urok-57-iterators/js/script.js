"use strict";

// filter

const names = ['qwer','asdf','zxcvzxcvzxcvzxcvzxcv','ghjkhgjk', 'uiopuiopuio'];

const shortNames = names.filter(function(name) {
	return name.length < 5;
});

console.log(shortNames);

