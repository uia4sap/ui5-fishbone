sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Element",
    "./library"
], function(
    Control,
    Element,
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
     *
     * @public
     * @alias ui5.fishbone.Fishbone
     */
    var oFishbone = Control.extend("ui5.fishbone.Fishbone", {

        __diagram: undefined,

        metadata: {

            "library": "ui5.fishbone",

            "properties": {

                width: { type: "string", group: "appearance", defaultValue: "100%" },

                height: { type: "string", group: "appearance", defaultValue: "50%" },

                drillEnabled: { type: "boolean", group: "appearance", defaultValue: true },

                data: { type: "object", group: "data", defaultValue: undefined }
            },

            "events": {

                drilled: {
                    parameters: {
                        data: { type: "object" }
                    }
                },

                nodeClicked: {
                    parameters: {
                        data: { type: "object" }
                    }
                }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        setWidth: function(width) {
            this.setProperty("width", width, true);
            if (this.__diagram) {
                this.__diagram.width(width);
            }
            return this;
        },

        setHeight: function(height) {
            this.setProperty("height", height, true);
            if (this.__diagram) {
                this.__diagram.height(height);
            }
            return this;
        },

        setDrillEnabled: function(drillEnabled) {
            this.setProperty("drillEnabled", drillEnabled, true);
            if (this.__diagram) {
                this.__diagram.drillEnabled(drillEnabled);
            }
            return this;
        },

        setData: function(data) {
            this.setProperty("data", data, true);
            if (this.__diagram) {
                data.build(this.__diagram);
            }
            return this;
        },

        onAfterRendering: function() {
            this.__diagram = uia.fishbone.diagram(this.getId())
                .width(this.getWidth())
                .height(this.getHeight())
                .drillEnabled(this.getDrillEnabled())
                .drilled(this.onDrilled.bind(this))
                .nodeClicked(this.onNodeClicked.bind(this));

            var fishboneData = this.getData();
            if (fishboneData) {
                fishboneData.build(this.__diagram);
            }
        },

        onDrilled: function(d) {
            this.fireDrilled({
                data: d
            });
        },

        onNodeClicked: function(d) {
            this.fireNodeClicked({
                data: d
            });
        }
    });

    return oFishbone;
});
