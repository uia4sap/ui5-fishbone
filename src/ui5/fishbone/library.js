/**
 * Initialization Code and shared classes of library ui5-fishbone.
 */
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/library',
    "./libs/fishbonejs/uia-fishbone",
    "./libs/d3/d3.min"
], function (
	jQuery,
	library,
	Fishbone,
	D3
) {
	"use strict";

	sap.ui.getCore().initLibrary({
		name: "ui5.fishbone",
		dependencies: ["sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [
			"ui5.fishbone.Fishbone"
		],
		elements: [],
		noLibraryCSS: false,
		version: "${version}"
	});

	return ui5.fishbone;

});
