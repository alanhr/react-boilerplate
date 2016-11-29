let chai = require('chai'),
	chaiEnzyme = require('chai-enzyme'),
	hook = require('css-modules-require-hook'),
	path = require('path'),
	stylus = require('stylus'),
	jsdom = require('jsdom').jsdom;

chai.use(chaiEnzyme());

hook({
	extensions: ['.styl'],
	generateScopedName: '[local]',
	preprocessCss: function (css, filename) {
		return stylus(css)
			.set('filename', filename)
			.render();
	},
});

global.should = chai.should();
global.assert = chai.assert;
global.expect = chai.expect;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent: 'node.js'
};
