"use strict";

class User {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.human = true;
	};
	hello() {
		console.log(`Hello ${name}`);
	};
};

User.prototype.exit = function(name) {
	console.log(`Пользователь ${this.name} ушел`);
};

const ivan = new User('Ivan', 28);
const alex = new User('Alex', 20);

console.log(ivan);
console.log(alex);

ivan.hello();
alex.hello();
alex.exit();