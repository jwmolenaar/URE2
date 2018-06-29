sap.ui.define([	"sap/ui/core/mvc/Controller",
				"sap/ui/core/routing/History",
				"sap/m/MessageBox",
				"sap/ui/model/json/JSONModel" ], function(Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("mccoy.com.URE2.controller.NewRun", {
		
		onInit: function() {
		//*******************************************************************************
		//*******************************************************************************
			// Local View Model used to manage data within this view
			// var oViewModel = new JSONModel({
			// 	"RACE_ID": null,
			// 	"RUN_ID": 1,
			// 	"CIRCUIT": null,
			// 	"TEMPERATURE": null,
			// 	"RACE_DESCRIPTION": "test",
			// 	"START_TIME": null,
			// 	"END_TIME": null,
			// 	"RACE_TYPE": null,
			// 	"WEATHER": null,
			// 	"NOTES": null,
			// 	"CAR_ID": null,
			// 	"CAR_NOTES": null,
			// 	"NAME_DRIVER": null,
			// 	"LENGTH_DRIVER": null,
			// 	"WEIGHT_DRIVER": null,
			// 	"DRIVER_NOTES": null,
			// 	"DISTANCE": null
			// });
			// this.getView().setModel(oViewModel);
		
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("newrun").attachMatched(this._onRouteMatched, this);			
		},
		
		_onRouteMatched : function (oEvent)  {
		//*******************************************************************************
		// Event Handler for navigation to newRun view
		// Clear the newRun model
		//*******************************************************************************
			var oViewModel = new JSONModel({
				"RACE_ID": null,
				"RUN_ID": 1,
				"CIRCUIT": null,
				"TEMPERATURE": null,
				"RACE_DESCRIPTION": "",
				"START_TIME": null,
				"END_TIME": null,
				"RACE_TYPE": null,
				"WEATHER": null,
				"NOTES": null,
				"CAR_ID": null,
				"CAR_NOTES": null,
				"NAME_DRIVER": null,
				"LENGTH_DRIVER": null,
				"WEIGHT_DRIVER": null,
				"DRIVER_NOTES": null,
				"DISTANCE": null
			});
			this.getView().setModel(oViewModel);
		},

		onBack : function () {
		//*******************************************************************************
		//*******************************************************************************
			//The history contains a previous entry
			if (History.getInstance().getPreviousHash() !== undefined)
				window.history.go(-1);
			else	// There is no history! Replace the current hash with start page (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("home", null, true);
		},
		
		onCarTypeRBChange : function() {
//			var newRunModel = this.getView().getModel("newRunForm");
		},
		
		// _getLastRaceID : function() {
		// //*******************************************************************************
		// // Identify the current highest runID and allocate the next available runID
		// //*******************************************************************************
		// 	var sPath = "/URE_METADATA/$count";
		// 	var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
		// 	oUreMetadata.read(sPath, {
		// 		success: function(oData, response) {
		// 			var newRaceID = parseInt(oData);
		// 			return newRaceID;
		// 		},
		// 		error: function(oError) {
		// 			return oError;
		// 		}
		// 	});
		// },
		
		successHandler : function() {
		//*******************************************************************************
		//*******************************************************************************
		},
		
		_createNewRun : function(oView, oRouter) {
		//*******************************************************************************
		// Function will transfer data collected into the local view model towards the backend
		//*******************************************************************************
			//Get number of runs to increment raceID
			var oFormData   = this.getView().getModel();
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;
			
			oUreMetadata.read("/URE_METADATA/$count", {
				
				success: function(oData, response) {
					var newRaceID = parseInt(oData) + 1;
					oFormData.setProperty("/RACE_ID", newRaceID);
					
					oFormData.setProperty("/START_TIME", new Date());
					oUreMetadata.create("/URE_METADATA", oFormData.getProperty("/"), {
						success: function() { // Go to the Dashboard
							oRouter.navTo("dashboard", { 
								raceID : newRaceID
							});
						},
						
						error: function() {
							MessageBox.error( "error", {	
									actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) { oRouter.navTo("home", null, true); }
								}
							);
						}
					});
				},
				
				error: function(oError) {
					var msgText = "Error " + oError.message;
					MessageBox.error( msgText, {
							actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
							styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function(sAction) { oRouter.navTo("home", null, true);	}
						}
					);
				}
			});
		},
		
		onCreatePress : function() {
		//*******************************************************************************
		//*******************************************************************************
			var oRouter = this.getOwnerComponent().getRouter();
			this._createNewRun(this.getView(), oRouter);
		}

	});
	
});