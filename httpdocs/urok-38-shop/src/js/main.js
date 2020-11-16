"use strict";

const menuData = [
	{
		image: 'img/tabs/vegy.jpg', 
		title: 'Меню “Фитнес”', 
		description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
		price: 22
	},
	{
		image: 'img/tabs/elite.jpg', 
		title: 'Меню “Премиум”', 
		description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
		price: 55
	},
	{
		image: 'img/tabs/post.jpg', 
		title: 'Меню “Постное”', 
		description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
		price: 43
	}
];

class MenuItem {
	constructor(props = {image, title, description, price, parentNode, classes}) {
		this._isAppended = false;
		this.image = props.image;
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
			`<img src=${this.image} alt=${this.title}>
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
	
	const menuItems = menuData.map((dataItem) => {
		return new MenuItem({
			...dataItem,
			parentNode: menuFieldNode,
			classes: ['menu__item']
		});
	});
	
	const menuFieldTimerId = setInterval(() => {
		menuItems.forEach((item) => {
			item.price += 1;
			item.render();
		});
	}, 1000);
	
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
			modal = document.querySelector('.modal'),
			modalHideTrigger = modal.querySelectorAll('[data-close]');

	function show(node, blockBlody = false) {
		node.classList.remove('hide');
		if (blockBlody)
			document.body.classList.add('blocked');
		clearInterval(modalTimerId);
	};

	function hide(node, unBlockBlody = false) {
		node.classList.add('hide');
		if (unBlockBlody)
			document.body.classList.remove('blocked');
	};
	
	modalShowTrigger.forEach(button => {
		button.addEventListener('click', () => {
			show(modal, true);
		});
	});
	
	modalHideTrigger.forEach(button => {
		button.addEventListener('click', () => {
			hide(modal, true);
		});
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hide(modal, true);
		};
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && !modal.classList.contains('hide')) {
			hide(modal, true);
		};
	});

	// Показ попапа по времени после загрузки DOM
	const modalTimerId = setTimeout(() => show(modal, true), 100000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			console.log('end');
			show(modal, true);
			window.removeEventListener('scroll', showModalByScroll);
		};
	};
	window.addEventListener('scroll', showModalByScroll);

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо',
		fail: 'Что-то пошло не так...'
	};

	forms.forEach(form => {
		postData(form);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);
			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			});
			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => statusMessage.remove(), 2000);
				} else {
					statusMessage.textContent = message.fail;
				}
			});
		});
	}

});

function getZero(num) {
	if (num >= 0 && num < 10) { return `0${num}`; } else {return num;}
}