/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство private. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с show.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

// Код возьмите из предыдущего домашнего задания
const maxNameLength = 20;

let numberOfFilms;

const personalMovieDB = {
	_count : 0,
	getCount: function () { return this._count; },
	_private : false,
	toggleVisible: function () { this._private = !this._private; },
	isPrivate: function () { return this._private; },
	movies : {},
	actors : {},
	genres : [],

	init: function (flag = true) {
		if (!flag) { alert('Введите, пожалуйста число.'); }
		let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
		if (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms) ) {this.init(false);}
		this._count = numberOfFilms;
	},
	
	getPersonalLevel: function () {
		if (this._count < 10) { return "Просмотрено довольно мало фильмов"; }
			else if (this._count >= 10 && this._count <= 30) { return 'Вы классический зритель'; }
			else { return 'Вы киноман'; }
	},

	rememberFilms: function name() {
		for (let i = 1; i<=this._count; i++) {
		
			let name = '';
			while(true){
				name = prompt(`Как называется фильм №${i}?`, name).trim();
				// console.log(name.length);
				if (name.length < maxNameLength) {
					alert(`Длина названия фильма не может быть меньше ${maxNameLength} символов`);
					continue;
				}
				else { 
					break; 
				}
			}
			let rate = +0;
			while(true){
				rate = +prompt('На сколько оцените его?', 10);
				console.log(rate);
				if ( isNaN(rate) || rate < 1 || rate > 10 ) {
					alert('Введите число от 1 до 10');
					continue;
				}
				else { 
					break; 
				}
			}
			this.movies[name] = rate;
		}
	},


	show: function () {
		if (!this._private) {
			console.log(this);
		}
		else {
			console.log('Данная база данных не является общедоступной.');
		}
	},

	writeYourGenres: function () {
		for (let i = 1; i <= 1; i++) {
			let genresStr = prompt(`Ваши любимые жанры через запятую`, '').trim();
			if(genresStr) {
				let genres = genresStr.split(',');
				genres.forEach((item, i) => {
					if (item.trim() !== '')
						this.genres.push(item.trim());
				});
			}
			else { i--; continue; }
		}
	},	
	showGenres: function() {
		this.genres.forEach((item, i) => {
			console.log(`Жанр ${i}: ${item}`);
		});
	}
};
	
// personalMovieDB.init();
// console.log(personalMovieDB.getCount());
// console.log(personalMovieDB.getPersonalLevel());
// personalMovieDB.rememberFilms();
personalMovieDB.writeYourGenres();
personalMovieDB.show();
personalMovieDB.showGenres();





