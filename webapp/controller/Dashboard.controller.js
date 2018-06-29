sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("mccoy.com.URE2.controller.Dashboard", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		onInit: function() {
			var oViewModel = new sap.ui.model.json.JSONModel({
				raceID: null
			});
			this.getView().setModel(oViewModel, "viewModel");

			var oDashboardModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oDashboardModel, "dashboardModel");

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("dashboard").attachMatched(this._onRouteMatchedDashboard, this);

			

		},

		onBack: function() {
			//var oModel = this.getView().getModel();
			var sPreviousHash = History.getInstance().getPreviousHash();
			
			//Stop the interval.
			if (this.intervalHandle) {
				clearInterval(this.intervalHandle);
			}

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

			//Get data for dashboard from oData service.
			var oDataOverview = this.getOwnerComponent().getModel("OverviewDashboard");

			var sPath = "/OVERVIEW";

			var oViewModel = this.getView().getModel("viewModel");
			var sRaceID = oViewModel.getProperty("/raceID");

			var aFilters = [];
			var filterByRaceId = new sap.ui.model.Filter("RACE_ID", sap.ui.model.FilterOperator.EQ, sRaceID);
			aFilters.push(filterByRaceId);
			var filterByRunId = new sap.ui.model.Filter("RUN_ID", sap.ui.model.FilterOperator.EQ, "1");
			aFilters.push(filterByRunId);

			var aSorters = [];
			var sortByTimestamp = new sap.ui.model.Sorter("SENSOR_TIMESTAMP", true);
			aSorters.push(sortByTimestamp);

			var that = this;

			oDataOverview.read(sPath, {
				urlParameters: {
					"$top": "1"
				},
				filters: aFilters,
				sorters: aSorters,
				success: function(oData, response) {
					//var newData = oData.results[0];
					var oDashboardModel = that.getView().getModel("dashboardModel");
					oDashboardModel.setData(oData);
				},
				error: function(oError) {
					var oMyError = oError;
				}
			});
		},

		_onRouteMatchedDashboard: function(oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var sRaceID = oArgs.raceID;
			var oViewModel = this.getView().getModel("viewModel");
			oViewModel.setData({
				raceID: sRaceID
			});
			
			//Start the data refresh service.
			this._startDashboardService();
		},

		_startDashboardService: function() {
			var that = this;
			this.intervalHandle = setInterval(function() {
				that.pressRefreshDashboard();
			}, 500);
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mccoy.com.URE2.view.Dashboard
		 */
		onExit: function() {
			//Stop the interval.
			if (this.intervalHandle) {
				clearInterval(this.intervalHandle);
			}
		}

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

	});

});