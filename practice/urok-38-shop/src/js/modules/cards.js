import {getResource} from '../services/services';

function cards(menuFieldSelector) {
	// ------------- Cards ------------
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

	const menuFieldNode = document.querySelector(menuFieldSelector);
	const dbUrl = 'http://localhost:3000/menu';

	// ------------- Begin Нативный метод получения данных
	getResource('http://localhost:3000/menu')
		.then(data => {
			console.log(data);
			return data.map(({img, altimg, title, descr, price}) => {
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
	// ------------- End Нативный метод получения данных

}

export default cards;