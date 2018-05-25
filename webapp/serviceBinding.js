function initModel() {
	var sUrl = "/UreRaceData/OData/UreRaceData/OData/Overview.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}