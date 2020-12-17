'use strict';

const btn = document.querySelector('.btn');
let timerId,
	i = 0,
	pos = 0;

const box = document.querySelector('.box');
function myAnimation() {
	pos++;
	box.style.top = pos + 'px';
	box.style.left = pos + 'px';

	if (pos < 300) {
		requestAnimationFrame(myAnimation);
	}


}

btn.addEventListener('click', () => requestAnimationFrame(myAnimation));
let id = requestAnimationFrame(myAnimation);
cancelAnimationFrame(id);

// function logger() {
// 	console.log(i + ': Blablabla');
// 	if (i++ === 3) {
// 		clearInterval(timerId);
// 	}
// }

// let id = setTimeout(function log(){
// 	console.log('Trulala');
// 	id = setTimeout(log, 500);
// }, 500);