// "use strict";

links = document.querySelectorAll('a');
// console.log(links)

linksArr = Array.from(links);

tlinks = linksArr.map(item => {
	// console.log(item.innerText)
	if (item.innerText.indexOf('Вход на бесплатный тренинг') > -1) {
		// return item;
		console.log(item);
	};
});

// console.log(tlinks);

