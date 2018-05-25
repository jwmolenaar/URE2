sap.ui.define([	"sap/ui/core/mvc/Controller",
				"sap/ui/core/routing/History",
				"sap/ui/model/json/JSONModel" ], function(Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("mccoy.com.URE2.controller.NewRun", {

		onInit: function() {
			// Local View Model used to manage data within this view
			var oViewModel = new JSONModel({
			});
			this.getView().setModel(oViewModel, "newRunForm");
		},

		onBack : function () {
			//The history contains a previous entry
			if (History.getInstance().getPreviousHash() !== undefined)
				window.history.go(-1);
			else	// There is no history! Replace the current hash with start page (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("home", null, true);
		},
		
		onCarTypeRBChange : function() {
			var newRunModel = this.getView().getModel("newRunForm");
		},
		
		_createNewRun : function(oView) {
		//*******************************************************************************
		// Function will transfer data collected into the local view model towards the backend
		//*******************************************************************************
			// increment raceID
			// fire backend odata service as was done in Startpage (spath)

			//Get number of runs.
			var sPath = "/URE_METADATA/$count";
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			oUreMetadata.read(sPath, {
				success: function(oData, response) {
					var newRunID = parseInt(oData);
					newRunID++;
				},
				error: function(oError) {
					// var oError = oError;
				}
			});

		},
		
		onCreatePress : function() {
			var newRunModel = this.getView().getModel("newRunForm");
			// Gather data from local model and trigger backend registration
			this._createNewRun(this.getView());
		}


	});
	


});