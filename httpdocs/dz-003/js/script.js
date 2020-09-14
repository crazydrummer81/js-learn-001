/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';
const maxNameLength = 20;

let numberOfFilms;

const personalMovieDB = {
	 'count' : numberOfFilms,
	 'movies' : {},
	 'actors' : {},
	 'genres' : [],
	 'privat' : false,
};
	
personalMovieDB.count = start();
console.log(personalMovieDB.count);
detectPersonalLevel();
rememberMyFilms();
writeYourGenres(personalMovieDB);
// console.log(personalMovieDB.movies);
showMyDB(personalMovieDB);

function start(flag = true) {
	if (!flag) { alert('Введите, пожалуйста число.'); }
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
	if (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms) ) {start(false);}
	return numberOfFilms;
}

function detectPersonalLevel() {
	if (numberOfFilms < 10) { console.log('"Просмотрено довольно мало фильмов');}
	else if (numberOfFilms >= 10 && numberOfFilms <= 30) { console.log('Вы классический зритель');}
	else { console.log('Вы киноман'); }
}
	
function rememberMyFilms() {
	for (let i = 1; i<=personalMovieDB.count; i++) {
		
		let name = '';
		while(true){
			name = prompt(`Как называется фильм №${i}?`, name);
			console.log(name.length);
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
		
		personalMovieDB.movies[name] = rate;
	}
}

function showMyDB(db) {
	if (!db.privat) {
		console.log(db);
	}
	else {
		console.log('Данная база данных не является общедоступной.');
	}
}

function writeYourGenres(db) {
	const n = 3;
	for (let i = 1; i <= n; i++) {
		db.genres.push(prompt(`Ваш любимый жанр под номером ${i}`, ''));
	}
}

