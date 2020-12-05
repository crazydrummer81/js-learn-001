function modal() {
	// Модальное окно
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
		if (node.classList.contains('modal')) { clearTimeout(modalTimerId) };
	};

	function hide(node) {
		node.classList.remove('show');
		node.classList.add('hide');
	};
	
	modalShowTrigger.forEach(button => {
		button.addEventListener('click', () => {
			show(modal);
			blockBody();
		});
	});
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			console.log(e.target);
			hide(modal);
			unBlockBody();
		};
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && !modal.classList.contains('hide')) {
			hide(modal);
			unBlockBody();
		};
	});

	
	// Показ попапа по времени после загрузки DOM
	const modalTimerId = setTimeout(() => {
		show(modal);
		blockBody();
	},	30000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			console.log('end');
			show(modal);
			blockBody();
			window.removeEventListener('scroll', showModalByScroll);
		};
	};
	window.addEventListener('scroll', showModalByScroll);

	
}

module.exports = modal;