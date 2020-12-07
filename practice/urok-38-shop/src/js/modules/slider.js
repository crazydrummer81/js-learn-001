import {create} from '../main';

function slider({container, counter, wrapper, arrowPrev, arrowNext, counterCurrent, counterTotal, }) {
	// ------------ Slider ------------
	const sliderUrl = 'http://localhost:3000/slider';
	const slider = document.querySelector(container),
			sliderCounter           = slider.querySelector(counter),
			sliderWrapper           = slider.querySelector(wrapper),
			sliderCounterButtonPrev = sliderCounter.querySelector(arrowPrev),
			sliderCounterButtonNext = sliderCounter.querySelector(arrowNext),
			sliderCounterCurrent    = sliderCounter.querySelector(counterCurrent),
			sliderCounterTotal      = sliderCounter.querySelector(counterTotal);

	axios.get(sliderUrl).then(data => data.data).then(sliderData => {
		let currentIndex = 0;
		const slides = sliderData.map((slide) => {
			const div = create('div', 'offer__slide');
			div.innerHTML = `<img src="${slide.img}" alt="${slide.alt}" loading="lazy">`;
			sliderWrapper.append(div);
			return div;
		});

		// Nav dots
		const sliderNav = create('ul', 'carousel-indicators');
		const sliderNavDots = slides.map((slide, i) => {
			const dot = create('li', 'dot');
			dot.setAttribute('data-index', i);
			sliderNav.append(dot);
			return dot;
		});
		slider.append(sliderNav);
		sliderNav.addEventListener('click', function(e) {
			console.dir(e.target);
			setCurrent(e.target.dataset.index);
		});

		const currentIndexes = slides.map((slide, i) =>{
			const span = create('span');
			span.textContent = pad(i+1, 2);
			sliderCounterCurrent.append(span);
			return span;
		});
		function setCurrent(index) {
			slides.forEach((slide, i) => {
				slide.classList.remove('active');
				currentIndexes[i].classList.remove('active');
				sliderNavDots[i].classList.remove('active');
			});
			slides[index].classList.add('active');
			currentIndexes[index].classList.add('active');
			sliderNavDots[index].classList.add('active');
		};
		setCurrent(0);
		sliderCounterTotal.textContent = pad(slides.length, 2);
		sliderCounterButtonNext.addEventListener('click', function(e) {
			if (++currentIndex > slides.length-1) currentIndex = 0;
			setCurrent(currentIndex);
		});
		sliderCounterButtonPrev.addEventListener('click', function(e) {
			if (--currentIndex < 0) currentIndex = slides.length-1;
			setCurrent(currentIndex);
		});
	});
}


function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
};

export default slider;