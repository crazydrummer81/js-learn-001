'use strict';

try {
	console.log('Ok');
	console.log(z);
	console.log('Ok2');
} catch(e) {
	console.error('name', e.name);
	console.error('message', e.message);
	console.error('stack', e.stack);
} finally {

}

console.log('qqweqwe')