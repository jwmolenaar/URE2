sap.ui.define([],
	function() {
		"use strict";
		return {
			
			accelerationValue: function(sX, sY) {
				var result = "x " + sX + " / y " + sY;
				return result;
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