/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.querySelector('div.promo__adv').remove();
document.querySelector('.promo__genre').textContent = 'драма';
document.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';

const filmList = document.querySelector('ul.promo__interactive-list');

let movies = '';
for(let i in movieDB.movies) {
    movies += `<li class="promo__interactive-item"><span>${+i+1}</span>${movieDB.movies[i]}<div class="delete"></div></li>`;
}
document.querySelector('.promo__interactive-list').innerHTML = movies;
