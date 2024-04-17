sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Element",
    "./FishboneRenderer",
    "./library"
], function(
    Control,
    Element,
    FishboneRenderer,
    library
) {

    "use strict";

    /**
     * Constructor for a new Fishbone control.
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * @extends ui5.fishbone.Fishbone
     * @alias ui5.fishbone.Fishbone
     * 
     * @constructor
     * @public
     * @since 1.40
     * @name Fishbone
     */
    var oFishbone = Control.extend("ui5.fishbone.Fishbone", {

        __selected: 1,

        __diagram: null,

        __backbone: null,

        __dataset: null,

        metadata: {

            library: "ui5.fishbone",

            properties: {

                width: { type: "string", group: "appearance", defaultValue: "100%" },

                height: { type: "string", group: "appearance", defaultValue: "300px" },

                drillEnabled: { type: "boolean", group: "appearance", defaultValue: true },

                maxBranches: { type: "int[]", group: "data", defaultValue: [8, 3, 3, 3] }
            },

            events: {

                drilled: {
                    parameters: {
                        diagram: { type: "object" },
                        data: { type: "object" }
                    }
                },

                nodeClicked: {
                    parameters: {
                        diagram: { type: "object" },
                        data: { type: "object" }
                    }
                }
            }
        },

        renderer: FishboneRenderer,

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        setDrillEnabled: function(bDrillEnabled) {
            this.setProperty("drillEnabled", bDrillEnabled, false);
        },

        setWidth: function(sWidth) {
            this.setProperty("width", sWidth, false);
        },

        setHeight: function(sHeight) {
            this.setProperty("height", sHeight, false);
        },

        setMaxBranches: function(aryMaxBranches) {
            this.setProperty("maxBranches", aryMaxBranches, false);
        },

        onBeforeRendering: function() {
            this.__diagram = null;
        },

        onAfterRendering: function() {
            this.refreshBones();
        },

        findPath: function(id, sortF) {
            return this.__diagram ? this.__diagram.path(id, sortF) : [];
        },

        getSelectedIndex: function() {
            return this.__selected;
        },

        getSelectedData: function() {
            return this.__diagram ? this.__diagram.backbone() : null;
        },

        changeTo: function(boneKey) {
            if (this.__selected == boneKey) {
                return
            };
            if (this.__diagram && this.__diagram.draw(boneKey)) {
                this.__selected = boneKey;
            }
        },

        refreshBones: function(oBone) {
            if (!this.__diagram) {
                this.__diagram = uia.fishbone.diagram(this.getId())
                    .height(this.getHeight())
                    .drillEnabled(this.getDrillEnabled())
                    .drilled(this.onDrilled.bind(this))
                    .maxBranches(this.getMaxBranches())
                    .nodeClicked(this.onNodeClicked.bind(this));
            }

            if (oBone) {
                this.__selected = 1;
                this.__dataset = oBone.build();
            }

            if (this.__dataset) {
                var idx = this.__selected;
                this.__selected = 1;
                this.__diagram.load(this.__dataset);
                this.changeTo(idx);
            } else {
                this.__selected = 1;
                this.__diagram.load();
            }
        },

        //setBackbone: function(oBackbone) {
        //    this.__selected = 1;
        //    this.__backbone = oBackbone;
        //    if (this.__diagram) {
        //        this.refreshBones();
        //   }
        //},

        //getBackbone: function() {
        //    return this.__backbone;
        //},

        getRootData: function() {
            return this.__diagram.backbone();
        },

        refresh: function() {
            this.invalidate();
            if (!this.__diagram) {
                return;
            }
            this.__diagram.refresh();
        },

        onDrilled: function(diagram, data) {
            this.__selected = data.key;
            this.fireDrilled({
                diagram: diagram,
                data: data
            });
        },

        onNodeClicked: function(diagram, data) {
            this.fireNodeClicked({
                diagram: diagram,
                data: data
            });
        }
    });

    return oFishbone;
});
