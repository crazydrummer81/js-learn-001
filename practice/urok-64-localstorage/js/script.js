'use strict';

// localStorage.setItem('number', 5);

// console.log(localStorage.number);

// localStorage.removeItem('number');
// localStorage.clear();

console.log('DO', localStorage);

const checkbox = document.querySelector('#checkbox'),
		form = document.querySelector('form'),
		change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
	checkbox.checked = true;
};

if (localStorage.getItem('bg') === 'changed') {
	form.style.backgroundColor = 'red';
}

checkbox.addEventListener('change', () => {
	if (checkbox.checked) localStorage.setItem('isChecked', true);
	else localStorage.removeItem('isChecked');
});

change.addEventListener('click', () => {
	if (localStorage.getItem('bg') === 'changed') {
		localStorage.removeItem('bg');
		form.style.backgroundColor = '#fff';
	} else {
		localStorage.setItem('bg', 'changed');
		form.style.backgroundColor = 'red';
	}
});

const person = {
	name: 'Alex',
	age: 25
};

const serializedPerson = JSON.stringify(person);
localStorage.setItem('alex', serializedPerson);

console.log('PERSON', localStorage.getItem(person));
console.log('POSLE', localStorage);