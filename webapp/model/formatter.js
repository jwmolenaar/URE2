sap.ui.define([],
	function() {
		"use strict";
		return {
			statusText: function(sStatus) {
				var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
				switch (sStatus) {
					case "A":
						return resourceBundle.getText("invoiceStatusA");
					case "B":
						return resourceBundle.getText("invoiceStatusB");
					case "C":
						return resourceBundle.getText("invoiceStatusC");
					default:
						return sStatus;
				}
			},
			
			statusState: function(sStatus) {
				return sStatus || "None";
			},
			
			batteryTempValueColor: function(sValue) {
				if (sValue >= 55) {
					return "Error";
				} else if (sValue >= 40) { 
					return "Critical";
				} else {
					return "Good";
				}
			},
			
			motorTempValueColor: function(sValue) {
				if (sValue >= 110) {
					return "Error";
				} else if (sValue >= 90) { 
					return "Critical";
				} else {
					return "Good";
				}
			},
			
			invTempValueColor: function(sValue) {
				if (sValue >= 80) {
					return "Error";
				} else if (sValue >= 60) { 
					return "Critical";
				} else {
					return "Good";
				}
			}
		}

		;
	});