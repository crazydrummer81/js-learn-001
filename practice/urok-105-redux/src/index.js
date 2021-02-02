import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'; // Передает параметры по всей иерархии ниже
import reducer from './reducer';
import App from './components/app';

// STORE
const store = createStore(reducer);

const update = () => {
	ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'));
}
update();
