/*globals define*/

define([
	'react',
	"mustache",
	"./timeMessage",
	"text!./timer.html",
	"htmlToJs"
], function (
	React,
	mustache,
	TimeMessage,
	timerHtml,
	htmlToJs
) {
	/**
	 * <Timer start={aDate} />
	 */
	return React.createClass({
		getInitialState: function () {
			return { now: new Date() };
		},

		componentDidMount: function (el, root) {
			var that = this;
			setInterval(function () {
				that.setState({ now: new Date() });
			}, 50);
		},

		render: function () {
			// JSX code
			var elapsed = this.state.now.getTime() - this.props.start.getTime();

			return htmlToJs(mustache.to_html(timerHtml, {
				elapsed: elapsed
			}), {
				TimeMessage: TimeMessage
			});
		}
	});

});
