/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

'use strict';
let numberOfFilms = 0;
let flag = false;
while (!flag){
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', 1);
	flag = (!isNaN(numberOfFilms) && numberOfFilms > 0);
	if (!flag) {alert('Введите число болше 0');}
}

const personalMovieDB = {
    'count' : numberOfFilms,
    'movies' : {},
    'actors' : {},
    'genres' : [],
    'privat' : false,
	};
const maxNameLength = 20;
console.log(personalMovieDB.count);
	
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

console.log(personalMovieDB.movies);