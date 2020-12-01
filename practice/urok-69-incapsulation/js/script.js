'use strict';

class User {
	#name;
	#surname;
	#age;

	constructor(name, surname, age) {
		this.#name = name;
		this.#age = age;
		this.#surname = surname;
	}

	say = () => {
		console.log(`Имя пользователя: ${this.#name} ${this.#surname}, восраст: ${this.#age}`);
	};

	get name() {
		return this.#name;
	}

	set name(name) {
		this.#name = name;
	}
	get surname() {
		return this.#surname;
	}

	set surname(surname) {
		this.#surname = surname;
	}

	get age() {
		return this.#age;
	};

	set age(age) {
		if (typeof age === 'number' && age > 0 && age < 110) {
			this.#age = age;
		} else {
			console.error('Недодпустимое значение возраста.')
		}
	}
};

const ivan = new User('Ivan', 'Sidirov', 45);
console.log(ivan.name);
console.log(ivan.age);
ivan.age = 10;

console.log(ivan.surname);

ivan.age = 39;
ivan.name = 'Pet';
ivan.say();