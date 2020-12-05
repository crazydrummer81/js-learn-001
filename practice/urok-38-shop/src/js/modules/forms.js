function forms() {
	// ----- Отправка формы -----
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/preloader.gif',
		success: 'Спасибо, мы обязательно свяжемся с вами!',
		fail: 'Что-то пошло не так...'
	};

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			// clearTimeout(modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
			
			const preloader = create('div', 'preloader')
			form.append(preloader);

			const formData = new FormData(form);
			console.log(formData);
			
			
			const currentDate = new Date().toString();
			const json = JSON.stringify({...Object.fromEntries(formData.entries()), date: currentDate});

			postData('http://localhost:3000/requests', json)
				.then(data => {
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
		const thanksModal = create('div', 'thanks__content', result=='success' ? 'success' : 'fail');
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
	};


}

module.exports = forms;