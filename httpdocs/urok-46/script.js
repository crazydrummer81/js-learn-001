"use strict";

// function showThis(a, b) {
// 	console.log(this);
// 	function sum() {
// 		console.log(this);
// 		return a + b;
// 	}
// 	console.log(sum());
// };

// showThis(2,5);

// const obj = {
// 	a: 20,
// 	b: 24,
// 	sum: function() {
// 		console.log(this);
// 	}
// }

// obj.sum();

// class User {
// 	constructor(name, id) {
// 		this.name = name;
// 		this.id = id;
// 		this.human = true;
// 	};
// 	hello() {
// 		console.log(`Hello ${name}`);
// 	};
// };

// const ivan = new User('Ivan', 28);

// function sayName(surname) {
// 	console.log(this);
// 	console.log(this.name + surname);
// }

// const user = {
// 	name: 'John'
// }

// sayName.call(user, ' Smith');
// sayName.apply(user, [' Nirt']);

// function count(num) {
// 	return this*num;
// }

// const double = count.bind(2);
// console.log(double(3));

//! 1) Обычная функция this = window, но если use strict - undefined
//! 2) Контекст у методов объекта - сам объект
//! 3) this в конструкторах и классах - это новый экземпляр объекта
//! 4) ручная привязка this: call, apply, bind


const btn = document.querySelector('button');


btn.addEventListener('click', function() { // В таком виде this будет сам элемент события (как e.target)
	console.log(this);
});
// Тоже самое
btn.addEventListener('click', (e) => { // В таком виде this будет window
	console.log(e.target);
});

const obj = {
	num: 5,
	sayNumber: function() {
		const say = () =>	{
			console.log(this);
		};
		say();
	}
};

obj.sayNumber();

const double = a => a*2;

console.log(double(4));

