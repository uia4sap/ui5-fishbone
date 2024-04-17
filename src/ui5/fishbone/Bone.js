sap.ui.define([
    "sap/ui/core/Element",
    "./library"
], function(
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
     * @alias ui5.fishbone.Bone
     */
    var oBone = Element.extend("ui5.fishbone.Bone", {

        metadata: {

            library: "ui5.fishbone",

            properties: {

                name: { type: "string", group: "appearance" },

                display: { type: "boolean", group: "appearance", defaultValue: true },

                data: { type: "any", group: "data" },

                value: { type: "int", group: "data", defaultValue: 0 }
            },

            defaultAggregation: "bones",

            aggregations: {
                bones: {
                    type: "ui5.fishbone.Bone",
                    multiple: true,
                    singularName: "bone"
                }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        build: function(parent) {
            var name = this.getName();
            var value = this.getValue();
            var data = this.getData();
            var display = this.getDisplay();
            var curr;
            if (parent) {
                curr = parent.add(name, value, data, display);
            } else {
                parent = uia.fishbone.data(name, value, data, true);
                curr = parent;
            }

            var children = this.getBones();
            children.forEach(function(child) {
                child.build(curr);
            });

            return parent;
        }
    });

    return oBone;
});
