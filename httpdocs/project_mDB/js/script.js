/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

let movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против всех"
    ],
    favourites : []
};

const promoContent = document.querySelector('.promo__content'),
      movieList = promoContent.querySelector('.promo__interactive-list'),
      adBlocks = document.querySelectorAll('.promo__adv img'),
      form = promoContent.querySelector('form.add'),
      input = form.querySelector('input[type="text"'),
      checkbox = form.querySelector('input[type="checkbox"');
        
adBlocks.forEach(item => item.remove());

promoContent.querySelector('.promo__genre').textContent = 'драма';
promoContent.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';

function renderMovieListItem(i, name) { 
    let nameSliced = name;
    if (name.length > 21) {
        nameSliced = name.slice(0, 21) + '...';
    }
    return `
        <li class="promo__interactive-item" data-name="${name}">${nameSliced}
            <span>${i}</span>
            <div class="delete"></div>
        </li>
    `;

}
    
function showMovieDB() {
    movieList.innerHTML = '';
    movieDB.movies.sort().forEach((movie, i) => {
        movieList.innerHTML += renderMovieListItem(i+1, movie);
    });
    const btnAdd = form.querySelector('button'),
          btnDelete = movieList.querySelectorAll('.delete');
    btnAdd.addEventListener('click', (event) => {
        event.preventDefault();
        input.value = input.value.trim();
        if (input.value) {
            movieDB.movies.push(escapeHtml(input.value));
            if(checkbox.checked) {
                movieDB.favourites.push(input.value);
                console.log(movieDB);
            }
            input.value = '';
            showMovieDB();
        }
    });
    btnDelete.forEach(btn => {
        btn.addEventListener('click', (event) => {
            for(let i in movieDB.movies) {
                if(movieDB.movies[i] == btn.parentElement.dataset.name) {
                    movieDB.movies.splice(i, 1);
                }
            }
            showMovieDB();
        });
    });
}
showMovieDB();

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }