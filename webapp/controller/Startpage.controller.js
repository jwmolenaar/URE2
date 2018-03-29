sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(jQuery, Controller, JSONModel) {
	"use strict";

	function navigateNewRun(oRouter) {
		oRouter.navTo("newrun");
	}

	return Controller.extend("mccoy.com.URE2.controller.Startpage", {
		onInit: function() {
		},
		
		onPressNewRun : function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			navigateNewRun(oRouter);
		}
	});
	
	
});