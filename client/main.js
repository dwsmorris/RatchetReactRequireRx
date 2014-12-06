﻿/*globals require*/

require({
	paths: {
		"es5-sham": "thirdParty/es5-sham",
		"es5-shim": "thirdParty/es5-shim",
		"console-polyfill": "thirdParty/console-polyfill",
		html5shiv: "thirdParty/html5shiv",
		react: "thirdParty/react-with-addons",
		JSXTransformer: "thirdParty/JSXTransformer"/*,
		underscore: "thirdParty/underscore-1.6.0",
		jquery: "thirdParty/jquery-2.0.3"
		*/
	},
	jsx: {
		fileExtension: ".jsx"
	},
	map: {
		"*": {
			/*css: "thirdParty/require-css/css",
			i18n: "thirdParty/i18n",
			image: "thirdParty/image",*/
			text: "thirdParty/text",
			jsx: "thirdParty/jsx"
		}
	},
	shim: {
		"es5-sham": {
			deps: ["es5-shim"]
		},
		react: {
			deps: ["es5-shim", "es5-sham", "console-polyfill", "html5shiv"]
		}
	},
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	"react",
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (
	React
) {
	window.React = React;

	require(["jsx!vdom/app"]);
});