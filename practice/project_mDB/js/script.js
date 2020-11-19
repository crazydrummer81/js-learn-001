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
document.addEventListener('DOMContentLoaded', () => {
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
        isFafourite: function(movie) {
            if (movieDB.favourites.indexOf(movie) > -1) { return true; }
            else { return false; }
        },
        show: function() {
            movieList.innerHTML = '';
            this.movies.sort().forEach((movie, i) => {
                movieList.innerHTML += this._renderMovieListItem(i+1, movie);
            });
            const btnsDelete = movieList.querySelectorAll('.delete');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                input.value = input.value.trim();
                this.add(input.value);
                this.show();
            });
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    this.delete(btn.parentElement.dataset.id);
                    this.show();
                });
            });
        },
        add: function(movie) {
            if (movie) {
                movieDB.movies.push(escapeHtml(movie));
                if(checkbox.checked) {
                    movieDB.favourites.push(movie);
                }
                this._resetForm();
            }
        },
        delete: function(id) {
            if (id > movieDB.movies.length-1) {
                console.error('Index to delete out of range');
            }
            movieDB.movies.splice(id, 1);
        },
        _renderMovieListItem: function(i, name) {
            let nameSliced = name;
            if (name.length > 21) {
                nameSliced = name.slice(0, 21) + '...';
            }
            const favouriteClass = this.isFafourite(name) ? ' favourite' : '';
            return `
                <li class="promo__interactive-item${favouriteClass}" data-name="${name}" data-id="${i-1}">${nameSliced}
                    <span>${i}</span>
                    <div class="delete"></div>
                </li>
            `;
        },
        _resetForm: function() {
            checkbox.checked = false;
            input.value = '';
        }
    };
            
    //Удаление рекламных блоков
    adBlocks.forEach(item => item.remove());

    promoContent.querySelector('.promo__genre').textContent = 'драма';
    promoContent.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';

    movieDB.show();
});


//------------------------------------------------
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }