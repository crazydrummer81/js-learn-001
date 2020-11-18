/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const menuData = [{
  image: 'img/tabs/vegy.jpg',
  title: 'Меню “Фитнес”',
  description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  price: 22
}, {
  image: 'img/tabs/elite.jpg',
  title: 'Меню “Премиум”',
  description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  price: 55
}, {
  image: 'img/tabs/post.jpg',
  title: 'Меню “Постное”',
  description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
  price: 43
}];

class MenuItem {
  constructor(props = {
    image,
    title,
    description,
    price,
    parentNode,
    classes
  }) {
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
  }

  changeToKZT() {
    this.price = this.price * this.transfer;
  }

  render() {
    this.classes.forEach(className => this.node.classList.add(className));
    this.node.innerHTML = `<img src=${this.image} alt=${this.title}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
			</div>`;

    if (!this._isAppended) {
      this.parent.append(this.node);
      this._isAppended = true;
    }
  }

}

;
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded'); // ------------- Cards ------------

  const menuFieldNode = document.querySelector('#menu__field .container');
  const menuItems = menuData.map(dataItem => {
    return new MenuItem({ ...dataItem,
      parentNode: menuFieldNode,
      classes: ['menu__item']
    });
  });
  const menuFieldTimerId = setInterval(() => {
    menuItems.forEach(item => {
      item.price += 1;
      item.render();
    });
  }, 1000); //------------- Tabs --------------

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
  tabsParent.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // ----------------- Timer -----------------------

  const deadLine = '2020-11-08';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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

  setClock('.timer', deadLine); // Модальное окно

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

    if (node.classList.contains('modal')) {
      clearTimeout(modalTimerId);
    }

    ;
  }

  ;

  function hide(node) {
    node.classList.remove('show');
    node.classList.add('hide');
  }

  ;
  modalShowTrigger.forEach(button => {
    button.addEventListener('click', () => {
      show(modal);
      blockBody();
    });
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      console.log(e.target);
      hide(modal);
      unBlockBody();
    }

    ;
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && !modal.classList.contains('hide')) {
      hide(modal);
      unBlockBody();
    }

    ;
  }); // Показ попапа по времени после загрузки DOM

  const modalTimerId = setTimeout(() => {
    show(modal);
    blockBody();
  }, 30000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      console.log('end');
      show(modal);
      blockBody();
      window.removeEventListener('scroll', showModalByScroll);
    }

    ;
  }

  ;
  window.addEventListener('scroll', showModalByScroll);
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/preloader.gif',
    success: 'Спасибо, мы обязательно свяжемся с вами!',
    fail: 'Что-то пошло не так...'
  };
  forms.forEach(form => {
    postData(form);
  });

  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      clearTimeout(modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
      const preloader = document.createElement('div');
      preloader.classList.add('preloader');
      form.append(preloader);
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => data.json()).then(data => {
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
    thanksModal.classList.add('thanks__content', result == 'success' ? 'success' : 'fail');
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
  }

  ;
});

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map