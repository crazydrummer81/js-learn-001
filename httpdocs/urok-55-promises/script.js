"use strict";

console.log('Запрос данных...');

const req = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('Подготовка данных...');

		const product = {
			name: 'TV',
			price: 4500
		};
		resolve(product);
	}, 2000);
});

req.then((product) => {
	const req2 = new Promise((resolve, reject) => {
		setTimeout(() => {
			product.status = 'order';
			resolve(product);
		}, 2000);
	});

	req2.then(data);

});

