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

			var oViewModel;
			// Model used to manipulate dynamic values of tiles
			oViewModel = new JSONModel({
				tileAllRunsNumVisable: false,
				tileAllRunsNumValue: 0
			});
			this.getView().setModel(oViewModel, "worklistView");

			//Get number of runs.
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			
			//Old way of working.
			/*var oUreMetadata = new sap.ui.model.odata.v2.ODataModel("/UreRaceData/OData/UreMetadata.xsodata/", {
				useBatch: false
			});*/

			var sPath = "/URE_METADATA/$count";
			oUreMetadata.read(sPath, {
				success: function(oData, response) {
					oViewModel.setProperty("/tileAllRunsNumValue", oData);
					oViewModel.setProperty("/tileAllRunsNumVisable", true);
				},
				error: function(oError) {
					var oError = oError;
				}
			});
		},

		onPressNewRun: function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			navigateNewRun(oRouter);
		}
	});

});