sap.ui.define([	"sap/ui/core/mvc/Controller",
				"sap/ui/core/routing/History" ], function(Controller, History) {
	"use strict";


	return Controller.extend("mccoy.com.URE2.controller.NewRun", {

		onBack : function () {
			//var oModel = this.getView().getModel();
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				// window.history.go(-1);
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			}
			else	// There is no history!				
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("home", null, true);
		},
		
		onCarTypeRBChange : function() {
			
		}

	});

});