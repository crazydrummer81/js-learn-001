'use strict';
const {createStore} = Redux;

const reducer = (state = 0, action) => {
	switch (action.type) {
		case 'INC': return state + 1; break;
		case 'DEC': return state - 1; break;
		case 'RST': return 0; break;
		default: return state;
	}
}

// ACTION CREATERS
const inc = () => ({type: 'INC'}),
      dec = () => ({type: 'DEC'}),
      rst = () => ({type: 'RST'});

const number = document.getElementById('number'),
      btnDec = document.getElementById('dec'),
      btnInc = document.getElementById('inc'),
      btnRnd = document.getElementById('rnd');

const store = createStore(reducer);

btnDec.addEventListener('click', () => store.dispatch(dec()));

btnInc.addEventListener('click', () => store.dispatch(inc()));

btnRnd.addEventListener('click', () => store.dispatch(rst()));

const update = () => {
	number.textContent = store.getState();
};

update();

store.subscribe(update);