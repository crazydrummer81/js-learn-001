"use strict";

const names = ['qwer', 'asdfg', 'zxcv', 'cvbncvbn', 'qwerqwerqwer'];
console.log(names);



let newArr = names.filter((name) => {
	return name.length < 5;
});
console.log(newArr);

newArr = names.map(name => name[0]);
console.log(newArr);

const some = ['asdasd', 34, 'zxczxc', 'dgdgf'];

console.log(some.some(item => typeof(item) === 'number'));

console.log(some.every(item => typeof(item) === 'number'));

console.log(names.every(item => typeof(item) === 'string'));

// reduce 
const numbers = [2,3,4,7,2,5,7,3,32,346];

newArr = numbers.reduce((sum, current) => sum + current);
console.log(newArr);

newArr = names.reduce((res, current) => `${res}, ${current}`, 'Vaysa');
console.log(newArr);

const obj = {
	vasya: 'person',
	katya: 'person',
	dog: 'animal',
	cat: 'animal'
};

newArr = Object.entries(obj);
console.log(newArr);

newArr = Object.entries(obj)
	.filter(item => item[1] === 'person')
	.map(item => item[0]);
console.log(newArr);

