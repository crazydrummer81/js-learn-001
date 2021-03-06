"use strict";

// console.log('Запрос данных...');

// const req = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log('Подготовка данных...');

// 		const product = {
// 			name: 'TV',
// 			price: 4500
// 		};
// 		resolve(product);
// 	}, 2000);
// });

// req.then((product) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			product.status = 'order';
// 			resolve(product);
// 		}, 2000);
// 	}).then(data => {
// 		data.modify = true;
// 		console.log('Модификация данных...');
// 		return data;
// 	}).then((data) => {
// 		console.log(data);
// 	}).catch(() => {
// 		console.error('Произошла ошибка');
// 	}).finally(() => {
// 		console.log('Finally');
// 	});
// });

const test = time => {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time);
	});
};

test(1000).then(() => console.log('1000 ms'));
test(2000).then(() => console.log('2000 ms'));

Promise.all([test(1000), test(2000)]).then(() => {
	console.log('All');
});

Promise.race([test(1000), test(2000)]).then(() => {
	// Выполняется когда первый промис правильно отработал
	console.log('Race');
});

const obj = document.createElement('div');
obj.textContent = 'Some text';

obj.onclick = () => {
	console.log('div');
};

document.append(obj);


const div = document.createElement('div');
div.classList.add('box');
const div2 = document.createElement('div');
div2.classList.add('box2');
div.append(div2);
document.body.append(div);

setTimeout(function() {
	// console.log(this);
	div2.classList.add('active');
}, 1500);

div2.addEventListener('click', function(e) {
	console.log(e.target);
	console.log(this);
	this.classList.toggle('active');
});

window.addEventListener('click', function(e) {
	e.preventDefault();
});


