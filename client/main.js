/*globals require*/

require.config({
	paths: {
		"es5-sham": "thirdparty/es5-sham",
		"es5-shim": "thirdparty/es5-shim",
		"console-polyfill": "thirdparty/console-polyfill",
		html5shiv: "thirdparty/html5shiv",
		"react": "thirdparty/react-with-addons",
		"jsxTransformer": "thirdparty/JSXTransformer",
		"mustache": "thirdparty/mustache",
		maskedEval: "utility/maskedEval",
		xmlToJs: "utility/xmlToJs",
		jquery: "thirdparty/jquery"
	},
	map: {
		"*": {
			/*css: "thirdparty/require-css/css",
			i18n: "thirdparty/i18n",
			image: "thirdparty/image",*/
			text: "thirdparty/text",
			jsx: "thirdparty/jsx"
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
	jsx: {
		fileExtension: '.jsx'
	}
});

require([
	'react',
	'components/timer/timer',
	"components/hellocomponent/hellocomponent",
	"xmlToJs",
	"text!demo2.xml",
	"es5-shim",
	"es5-sham",
	"console-polyfill",
	"html5shiv"
], function (
	React,
	timer,
	helloComponent,
	xmlToJs,
	demo2Xml
) {

	// Mount the JSX component in the app container
	React.render(
		React.createElement(timer, { start: new Date() }),
		document.getElementById('js-app-container')
	);

	React.render(
		xmlToJs(demo2Xml, {
			HelloComponent: helloComponent
		}),
		document.getElementsByClassName("label")[0]
	);
});
