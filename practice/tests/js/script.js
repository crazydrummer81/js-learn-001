"use strict";

// const div = document.querySelector('.test1');
// console.dir(div);

// div.style.cssText = 'color: yellow; display: flex;';

// async function f() {
// 	let r = await Math.max(1,2);
// 	console.log(r);
// }

// console.log(f());
class A {
	res = {};
	constructor(url) {
		fetch(url)
			.then(data => data.json())
			.then(json => this.res = json)
	}
}

const a = new A('https://jsonplaceholder.typicode.com/todos/1');

console.log('a', a);
setTimeout(() => console.log('a.res', a.res), 500)
console.log('a.res', a.res);









