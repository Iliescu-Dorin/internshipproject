/*
*DETAIL DENIED
*the manager can see the detail about the selected business trip from the form
*/

sap.ui.define([
    "intern2020/controller/BaseController"
], function (BaseController) {
   "use strict";

    return BaseController.extend("intern2020.controller.DetailDenied", {

        /* 
        *  Matching the route from the login page based on email and id
        */
        onInit : function() {

            this.getView().setBusy(true);
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detailDenied").attachMatched(this._onRouteMatched, this);
		},

        /*
		* Populating the form with the data from oData
		*/
		_onRouteMatched : function(oEvent) {
            
            var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();

            oView.bindElement({
				path : "/TripDetailsSet(Id='" + oArgs.employeeId + "',EmailAddress='" + oArgs.employeeEmail + "')",
            });

            this.getView().setBusy(false);
        },

    });
});