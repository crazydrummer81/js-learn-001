'use strict';

const path = require('path');

console.log('__dirname', __dirname);

module.exports = {
	mode: 'development',
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/js'
	},
	watch:true,

	devtool: "source-map",

	module: {}
};