'use strict';

const box = document.querySelector('.box'),
	   btn = document.querySelector('button');

const width = box.clientWidth;
const height = box.clientHeight;
const offsetWidth = box.offsetWidth;
const offsetHeight = box.offsetHeight;
const scrollWidth =  box.scrollWidth;
const scrollHeight = box.scrollHeight;

console.log(width, height); 
console.log(offsetWidth, offsetHeight); 
console.log(scrollWidth, scrollHeight); 

btn.addEventListener('click', () => {
	console.log('click');
	box.style.height = box.scrollHeight + 'px';
	box.style.height = '1000px';
	console.log(box.scrollTop);
	console.log(document.documentElement.scrollTop);
});

console.log(box.getBoundingClientRect().top);

const style = window.getComputedStyle(box, '::before');
console.log(style.position);
