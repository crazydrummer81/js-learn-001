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

const promoContent = document.querySelector('.promo__content'),
      movieList = promoContent.querySelector('.promo__interactive-list'),
      adBlocks = document.querySelectorAll('.promo__adv img'),
      form = promoContent.querySelector('form.add'),
      input = form.querySelector('input[type="text"'),
      checkbox = form.querySelector('input[type="checkbox"');

let movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против всех"
    ],
    favourites : [],
    show: function() {
        movieList.innerHTML = '';
        this.movies.sort().forEach((movie, i) => {
            movieList.innerHTML += this._renderMovieListItem(i+1, movie);
        });
        const btnAdd = form.querySelector('button'),
              btnDelete = movieList.querySelectorAll('.delete');
        btnAdd.addEventListener('click', (event) => {
            event.preventDefault();
            input.value = input.value.trim();
            this.add(input.value);
            this.show();
        });
        btnDelete.forEach(btn => {
            btn.addEventListener('click', (event) => {
                this.delete(btn.parentElement.dataset.name);
                this.show();
            });
        });
    },
    add: function(movie) {
        if (movie) {
            movieDB.movies.push(escapeHtml(movie));
            if(checkbox.checked) {
                movieDB.favourites.push(movie);
                console.log(movieDB);
            }
            input.value = '';
        }
    },
    delete: function(movie) {
        for(let i in movieDB.movies) {
            if(movieDB.movies[i] == movie) {
                movieDB.movies.splice(i, 1);
            }
        }
    },
    _renderMovieListItem: function(i, name) {
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
};
        
//Удаление рекламных блоков
adBlocks.forEach(item => item.remove());

promoContent.querySelector('.promo__genre').textContent = 'драма';
promoContent.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';

movieDB.show();

//------------------------------------------------
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }