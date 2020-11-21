"use strict";

const { data } = require("autoprefixer");

class MenuItem {
	constructor(props = {}) {
		this._isAppended = false;
		this.image = props.image;
		this.altimg = props.altimg;
		this.title = props.title;
		this.description = props.description;
		this.transfer = 450;
		this.price = props.price;
		this.currency = 'тг';
		this.classes = props.classes || ['menu__item'];
		this.parent = props.parentNode;
		this.changeToKZT();
		this.node = document.createElement('div');
		this.render();
	};

	changeToKZT() {
		this.price = this.price * this.transfer; 
	};

	render() {
		this.classes.forEach(className => this.node.classList.add(className));
		this.node.innerHTML = 
			`<img src=${this.image} alt=${this.altimg}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
			</div>`;
		if (!this._isAppended) {this.parent.append(this.node); this._isAppended = true;}
	};
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
	// ------------- Cards ------------
	const menuFieldNode = document.querySelector('#menu__field .container');
	const dbUrl = 'http://localhost:3000/menu';
	const sliderUrl = 'http://localhost:3000/slider';

	// ------------- Begin Нативный метод получения данных
	// const getResource = async (url) => {
	// 	const res = await fetch(url);

	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// 	};

	// 	return await res.json();
	// };

	// let menuItemsPromise = getResource('http://localhost:3000/menu')
	// ------------- End Нативный метод получения данных

	// Получение данных библиотекой axios
	let menuItemsPromise = axios.get(dbUrl)
		// Output cards
		.then(data => {
			return data.data.map(({img, altimg, title, descr, price}) => {
				return new MenuItem({
					image: img,
					altimg: altimg,
					title: title,
					description: descr,
					price: price,
					parentNode: menuFieldNode,
					classes: ['menu__item']
				});
			});
		});

	// menuItemsPromise.then(data => console.log(data));

	// ------------ Slider ------------
	const slider = document.querySelector('.offer__slider'),
			sliderCounter           = slider.querySelector('.offer__slider-counter'),
			sliderWrapper           = slider.querySelector('.offer__slider-wrapper'),
			sliderCounterButtonPrev = sliderCounter.querySelector('.offer__slider-prev'),
			sliderCounterButtonNext = sliderCounter.querySelector('.offer__slider-next'),
			sliderCounterCurrent    = sliderCounter.querySelector('#current'),
			sliderCounterTotal      = sliderCounter.querySelector('#total');

	axios.get(sliderUrl).then(data => data.data).then(sliderData => {
		let currentIndex = 0;
		const slides = sliderData.map((slide) => {
			const div = document.createElement('div');
			div.classList.add('offer__slide');
			div.innerHTML = `<img src="${slide.img}" alt="${slide.alt}" loading="lazy">`;
			sliderWrapper.append(div);
			return div;
		});
		const currentIndexes = slides.map((slide, i) =>{
			const span = document.createElement('span');
			span.textContent = pad(i+1, 2);
			sliderCounterCurrent.append(span);
			return span;
		});
		function setCurrent(index) {
			slides.forEach((slide, i) => {
				slide.classList.remove('active');
				currentIndexes[i].classList.remove('active');
			});
			slides[index].classList.add('active');
			currentIndexes[index].classList.add('active');
		};
		setCurrent(0);
		sliderCounterTotal.textContent = pad(slides.length, 2);
		sliderCounterButtonNext.addEventListener('click', function(e) {
			if (++currentIndex > slides.length-1) currentIndex = 0;
			setCurrent(currentIndex);
		});
		sliderCounterButtonPrev.addEventListener('click', function(e) {
			if (--currentIndex < 0) currentIndex = slides.length-1;
			setCurrent(currentIndex);
		});
		
	});
	
	//------------- Tabs --------------
	const tabs = document.querySelectorAll('.tabheader__item'),
			tabsContent = document.querySelectorAll('.tabcontent'),
			tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;

		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			}); 
		}
	});

	// ----------------- Timer -----------------------
	const deadLine = '2020-11-08';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000*60*60)) % 24),
				minutes = Math.floor((t / 1000 / 60) % 60 ),
				seconds = Math.floor((t / 1000 ) % 60 );
		
		return {
			'total': t, 
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
		      days = timer.querySelector('#days'),
		      hours = timer.querySelector('#hours'),
		      minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
		timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}
	setClock('.timer', deadLine);

	// Модальное окно
	const modalShowTrigger = document.querySelectorAll('[data-modal]'),
			modal = document.querySelector('.modal');

	function blockBody() {
		document.body.classList.add('blocked');
	}
	function unBlockBody() {
		document.body.classList.remove('blocked');
	}
	function show(node) {
		node.classList.remove('hide');
		node.classList.add('show');
		if (node.classList.contains('modal')) { clearTimeout(modalTimerId) };
	};

	function hide(node) {
		node.classList.remove('show');
		node.classList.add('hide');
	};
	
	modalShowTrigger.forEach(button => {
		button.addEventListener('click', () => {
			show(modal);
			blockBody();
		});
	});
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			console.log(e.target);
			hide(modal);
			unBlockBody();
		};
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && !modal.classList.contains('hide')) {
			hide(modal);
			unBlockBody();
		};
	});

	// Показ попапа по времени после загрузки DOM
	const modalTimerId = setTimeout(() => {
		show(modal);
		blockBody();
	},	30000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			console.log('end');
			show(modal);
			blockBody();
			window.removeEventListener('scroll', showModalByScroll);
		};
	};
	window.addEventListener('scroll', showModalByScroll);

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/preloader.gif',
		success: 'Спасибо, мы обязательно свяжемся с вами!',
		fail: 'Что-то пошло не так...'
	};

	// ----- Отправка формы -----
	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			clearTimeout(modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
			
			const preloader = document.createElement('div');
			preloader.classList.add('preloader');
			form.append(preloader);

			const formData = new FormData(form);
			console.log(formData);
			
			
			const currentDate = new Date().toString();
			const json = JSON.stringify({...Object.fromEntries(formData.entries()), date: currentDate});

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(e.target, message.success, 'success');
				}).catch(() => {
					showThanksModal(e.target, message.fail, 'fail');
					console.error('Ошибка сервера');
				}).finally(() => {
					preloader.remove();
					form.reset();
				});

		});
	}

	function showThanksModal(target, message, result = 'success') {
		console.log(target);
		const targetHeight = target.offsetHeight + 'px',
		      targetWidth = target.offsetWidth + 'px';
		hide(target);
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('thanks__content', result=='success' ? 'success' : 'fail');
		show(thanksModal);
		console.log(targetHeight);
		thanksModal.style.minHeight = targetHeight;
		thanksModal.style.minWidth = targetWidth;
		thanksModal.innerHTML = `
				<div class="thanks__title">${message}</div>
		`;

		target.parentNode.append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			show(target);
		}, 3000);
	};

});

function getZero(num) {
	if (num >= 0 && num < 10) { return `0${num}`; } else {return num;}
};
function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
};