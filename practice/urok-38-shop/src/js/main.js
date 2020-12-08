require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill'; // Библиртеки npm импортируются по умолчанию из node_modules



import tabs   from './modules/tabs';
import modal  from './modules/modal';
import calc   from './modules/calc';
import cards  from './modules/cards';
import slider from './modules/slider';
import forms  from './modules/forms';
import timer  from './modules/timer';

const { data } = require("autoprefixer");

// Run DB server
// npx json-server db.json

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');


	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal();
	calc();
	cards('#menu__field .container');
	slider({
		container: '.offer__slider',
		counter: '.offer__slider-counter',
		wrapper: '.offer__slider-wrapper',
		arrowPrev: '.offer__slider-prev',
		arrowNext: '.offer__slider-next',
		counterCurrent: '#current',
		counterTotal: '#total'
	});
	forms();
	timer('.timer', '2020-12-10');

});

function create(tag = 'div', classList = '') {
	const element = document.createElement(tag);
	if (classList) element.classList.add(classList);
	return element;
}

export {create};