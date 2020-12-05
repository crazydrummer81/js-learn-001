import _ from 'lodash';
// import * as data from './functions';
import sayHi from './functions'

function component() {
	const element = document.createElement('div');
	
	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
	return element;
 }
 
 document.body.appendChild(component());

//  console.log(data.one, data.two);
 sayHi()