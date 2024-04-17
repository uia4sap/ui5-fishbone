sap.ui.define([], function() {
    "use strict";

    /**
     * 
     * @namespace ui5.fishbone
     */
    var FishboneRenderer = {};

    /**
     * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
     *
     * @param {sap.ui.core.RenderManager} oRm RenderManager object
     * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
     */
    FishboneRenderer.render = function(oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("</div>");
    };

    return FishboneRenderer;

}, /* bExport= */ true);
