sap.ui.define([	"sap/ui/core/mvc/Controller",
				"sap/m/MessageBox",
				"sap/ui/core/routing/History" ], function(Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("mccoy.com.URE2.controller.Dashboard", {

		onBack: function() {
			//var oModel = this.getView().getModel();
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				// window.history.go(-1);
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			} else // There is no history!				
			// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("home", null, true);
		},
		
		pressStatusTemp: function() {
			var ohighVoltageChart = this.getView().byId("highVoltageChart");
			var sColor = ohighVoltageChart.getColor();
			sColor = sColor === "Good" ? "Error" : "Good";
			ohighVoltageChart.setColor(sColor);
		},
		
		pressRefreshDashboard: function() {
			
			//Get data for dashboard.
			var oDashboardModel = this.getOwnerComponent().getModel("OverviewDashboard");

			var sPath = "/OVERVIEW";
			
			var aFilters = [];
			var filterByRaceId = new sap.ui.model.Filter("RACE_ID", sap.ui.model.FilterOperator.EQ, "246");  
    		aFilters.push(filterByRaceId);
    		var filterByRunId = new sap.ui.model.Filter("RUN_ID", sap.ui.model.FilterOperator.EQ, "1");  
    		aFilters.push(filterByRunId);
    		
    		var aSorters = [];
    		var sortByTimestamp = new sap.ui.model.Sorter("SENSOR_TIMESTAMP", true);
    		aSorters.push(sortByTimestamp);
			
			oDashboardModel.read(sPath, {
				urlParameters:{"$top" : "1"},
				filters: aFilters,
				sorters: aSorters,
				success: function(oData, response) {
					var newData = oData;
				},
				error: function(oError) {
					var oError = oError;
				}
			});
		},
		
		pressStopDashboard : function() {
		//*******************************************************************************
		// Stop the run by updating the end timestamp and go back to the home view
		//*******************************************************************************
			var oView = this.getView();
			var oUreMetadata = this.getOwnerComponent().getModel("UreMetadata");
			var oFormData   = this.getView().getModel();
			var oRouter = this.getOwnerComponent().getRouter();
			
			var bCompact = !!oView.$().closest(".sapUiSizeCompact").length;


			var raceID = 300;
			var runID = 1;
			var oRaceMetaData = sap.ui.getCore().getModel("oRaceMetaData");
			var oPath = "/URE_METADATA(RACE_ID=" + raceID + ",RUN_ID=" + runID + ")";
			oRaceMetaData.setProperty(oPath + "/END_TIME", new Date());

			if (oRaceMetaData.hasPendingChanges()) {
				oRaceMetaData.submitChanges({
					success: function(oData) {
						sap.m.MessageToast.show("Test opgeslagen");
						oRouter.navTo("home", null, true);
					},
					error: function(oError) {
						sap.m.MessageToast.show("Error with saving current test");
					}
				});
			}
			else
				sap.m.MessageToast.show("No pending changes current test");


			// oUreMetadata.setProperty("/END_TIME", new Date());
			// oUreMetadata.update("/URE_METADATA", {
			// 	success: function() { // Go to the Dashboard
			// 		oRouter.navTo("home", null, true);
			// 	},
				
			// 	error: function() {
			// 		MessageBox.error( "error", {	
			// 				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
			// 				styleClass: bCompact ? "sapUiSizeCompact" : "",
			// 				onClose: function(sAction) { oRouter.navTo("home", null, true); }
			// 			}
			// 		);
			// 	}
			// });

		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		//	onExit: function() {
		//
		//	}

	});

});