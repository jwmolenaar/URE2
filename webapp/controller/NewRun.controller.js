sap.ui.define([	"sap/ui/core/mvc/Controller",
				"sap/ui/core/routing/History",
				"sap/m/MessageBox",
				"sap/ui/model/json/JSONModel" ], function(Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("mccoy.com.URE2.controller.NewRun", {
	// test commit
		onInit: function() {
			// Local View Model used to manage data within this view
			var oViewModel = new JSONModel({
				"RACE_ID": null,
				"RUN_ID": 1,
				"CIRCUIT": null,
				"TEMPERATURE": null,
				"RACE_DESCRIPTION": "test",
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
			//The history contains a previous entry
			if (History.getInstance().getPreviousHash() !== undefined)
				window.history.go(-1);
			else	// There is no history! Replace the current hash with start page (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("home", null, true);
		},
		
		onCarTypeRBChange : function() {
			var newRunModel = this.getView().getModel("newRunForm");
		},
		
	_getLastRunID : function() {
		//*******************************************************************************
		// Identify the current highest runID and allocate the next available runID
		//*******************************************************************************
			var sPath = "/URE_METADATA/$count";
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");

			oUreMetadata.read(sPath, {
				success: function(oData, response) {
					var newRaceID = parseInt(oData);
					return newRaceID;
				},
				error: function(oError) {
					return oError;
					// var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;
					// var msgText = "Error " + oError.message;
					// MessageBox.error( msgText,
					// 	{	actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					// 		styleClass: bCompact ? "sapUiSizeCompact" : "",
					// 		onClose: function(sAction) {
					// 			// sap.ui.core.UIComponent.getRouterFor(oView).navTo("page1", null, true);
					// 		}
					// 	}
					// );
				}
			});
			
		},
		
		successHandler : function() {
			
		},
		
		_createNewRun : function(oView) {
		//*******************************************************************************
		// Function will transfer data collected into the local view model towards the backend
		//*******************************************************************************
		
			// // State Constants
			// var STATE_START = 1;
			// var STATE_GET_LAST_RUNID = 2;
			// var STATE_NEXT_RUNID = 3;
			// var STATE_END = 99;
			
			// var stateID = STATE_START;
			// do {
			// 	switch (stateID) {
			// 		case STATE_START :
			// 			stateID = STATE_GET_LAST_RUNID;
			// 			break;
						
			// 		case STATE_GET_LAST_RUNID :
			// 			var lastRunID;

			// 			var sPath = "/URE_METADATA/$count";
			// 			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			// 			oUreMetadata.read(sPath, {
			// 				success: function(oData, response) {
			// 					var lastRunID = parseInt(oData);
			// 				},
			// 				error: function(oError) {
			// 					// return oError;
			// 				}
			// 			});

			// 			stateID = STATE_NEXT_RUNID;
			// 			break;
						
			// 		case STATE_NEXT_RUNID :
			// 			if (typeof lastRunID !== 'undefined' && !lastRunID) {
			// 				var nextRunID = lastRunID++;
			// 				stateID = STATE_END;
			// 			}
			// 			break;
			// 	}
			// } while (stateID!=STATE_END);
			
			//Get number of runs to increment raceID
			var oFormData   = this.getView().getModel();
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			
			oUreMetadata.read("/URE_METADATA/$count", {
				success: function(oData, response) {
					var newRaceID = parseInt(oData) + 1;
					oFormData.setProperty("/RACE_ID", newRaceID);
					oUreMetadata.create("/URE_METADATA", oFormData.getProperty("/"), {
						success: function() {
							var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;
							MessageBox.error( "success",
								{	actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) {
										// sap.ui.core.UIComponent.getRouterFor(oView).navTo("page1", null, true);
									}
								}
							);
						},
						error: function() {
								var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;
								MessageBox.error( "error",
									{	actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
										styleClass: bCompact ? "sapUiSizeCompact" : "",
										onClose: function(sAction) {
											// sap.ui.core.UIComponent.getRouterFor(oView).navTo("page1", null, true);
										}
									}
								);
						}
				}
			);
				},
				error: function(oError) {
					var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;
					var msgText = "Error " + oError.message;
					MessageBox.error( msgText,
						{	actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
							styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function(sAction) {
								// sap.ui.core.UIComponent.getRouterFor(oView).navTo("page1", null, true);
							}
						}
					);
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