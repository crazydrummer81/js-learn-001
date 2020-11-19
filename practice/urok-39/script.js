const btn = document.querySelector('.btn');
let timerId,
    i = 0;

function myAnimation() {
	const box = document.querySelector('.box');
	let pos = 0;
	const id = setInterval(frame, 10);
	function frame() {
		if (pos == 300) {
			clearInterval(id);
		} else {
			pos++;
			box.style.top = pos + 'px';
			box.style.left = pos + 'px';
		}
	}
}

btn.addEventListener('click', myAnimation, {once:true});

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