function calc() {
	const result = document.querySelector('.calculating__result span');
	
	let sex, height, weight, age, ratio;
	
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		const sexDefaultNode = document.querySelector('#gender .calculating__choose-item.calculating__choose-item_active');
		sex = sexDefaultNode.id;
		// sex = 'female';
	};
	
	if (localStorage.getItem('ratio')) {
		ratio = +localStorage.getItem('ratio');
	} else {
		const ratioDefaultNode = document.querySelector('.calculating__choose_big .calculating__choose-item.calculating__choose-item_active');
		ratio = +ratioDefaultNode.dataset.ratio;
		// ratio = 1.375;
	};

	console.log('sex', sex);
	
	function calcTotal() {
		console.log('calcTotal');
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else
		if (sex === 'male') {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	};
	

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.addEventListener('click', function(e) {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.id;
					localStorage.setItem('sex', sex);
				}
	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			console.log('elem.classList', elem.classList);
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === sex) {
				elem.classList.add(activeClass);
			};
			if (+elem.getAttribute('data-ratio') === ratio) {
				elem.classList.add(activeClass);
			};
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	calcTotal();

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', function(e) {

			if (input.value.match(/\D/g)) {
				input.classList.add('has-error');
			} else {
				input.classList.remove('has-error');
			}

			switch(input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');


}

module.exports = calc;