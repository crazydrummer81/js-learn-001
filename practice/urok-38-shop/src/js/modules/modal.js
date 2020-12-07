const modalNode = document.querySelector('.modal');

function modal() {
	// Модальное окно
	const modalShowTrigger = document.querySelectorAll('[data-modal]');

	// Показ попапа по времени после загрузки DOM
	const modalTimerId = setTimeout(() => {
		show(modalNode);
		clearTimeout(modalTimerId);
		blockBody();
	},	30000);

	function blockBody() {
		document.body.classList.add('blocked');
	}
	function unBlockBody() {
		document.body.classList.remove('blocked');
	}

	// window.addEventListener('scroll', () => {
	// 	showModalByScroll();
	// 	clearTimeout(modalTimerId);
	// 	window.removeEventListener('scroll', showModalByScroll);
	// });

	window.addEventListener('scroll', showModalByScroll);

	modalShowTrigger.forEach(button => {
		button.addEventListener('click', () => {
			show(modalNode);
			clearTimeout(modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
			blockBody();
		});
	});

	
	
	modalNode.addEventListener('click', (e) => {
		if (e.target === modalNode || e.target.getAttribute('data-close') == '') {
			console.log(e.target);
			hide(modalNode);
			unBlockBody();
		};
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && !modalNode.classList.contains('hide')) {
			hide(modalNode);
			unBlockBody();
		};
	});

	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			console.log('end');
			show(modalNode);
			blockBody();
			window.removeEventListener('scroll', showModalByScroll);
			clearTimeout(modalTimerId);
		};
	};
	
}

function show(node) {
	node.classList.remove('hide');
	node.classList.add('show');
};

function hide(node) {
	node.classList.remove('show');
	node.classList.add('hide');
};

export default modal;
export {hide};
export {show};
export {modalNode};