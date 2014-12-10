﻿/*globals define*/

define([
	"rx",
	"replicate",
	"react",
	"text!./items.xml",
	"mustache",
	"xmlToJs"
], function (
	Rx,
	replicate,
	React,
	itemsXml,
	mustache,
	xmlToJs
) {

	var modelItems$ = new Rx.BehaviorSubject(null);
	var itemWidthChanged$ = new Rx.Subject();
	var itemColorChanged$ = new Rx.Subject();
	var removeClicks$ = new Rx.Subject();
	var addOneClicks$ = new Rx.Subject();
	var addManyClicks$ = new Rx.Subject();

	var observe = function (itemsModel) {
		replicate(itemsModel.items$, modelItems$);
	};

	var items = modelItems$.map(function (itemsData) {
		return itemsData.map(function (itemData) {
			return {
				color: itemData.color,
				id: itemData.id,
				key: itemData.id
			};
		});
	});

	var itemsView = React.createClass({
		render: function () {
			return xmlToJs(mustache.to_html(itemsXml, {
				items: items
			}), {
				addItem: function (ev) {
					addOneClicks$.onNext(ev);
					itemsView.forceUpdate();
				},
				addManyItems: function (ev) {
					addManyClicks$.onNext(ev);
					itemsView.forceUpdate();
				},
				handleItemChange: function (ev) {
					itemColorChanged$.onNext(ev);
					itemsView.forceUpdate();
				},
				handleRemoveItem: function (ev) {
					removeClicks$.onNext(ev);
					itemsView.forceUpdate();
				}
			});
		}
	});

	return {
		observe: observe,
		itemsView: itemsView,
		removeClicks$: removeClicks$,
		addOneClicks$: addOneClicks$,
		addManyClicks$: addManyClicks$,
		itemColorChanged: itemColorChanged$
	};
});