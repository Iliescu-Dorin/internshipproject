/*
*MANAGER DENIED 
*the manager can see ALL the denied business trips from the data base and he 
*can see the details about a selected business trip 
*/

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterType",
    "sap/ui/model/FilterOperator",
], function (BaseController, MessageToast, History, UIComponent, Filter, FilterType, FilterOperator) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerDenied", {

        onInit : function() {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("managerDenied").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function(oEvent) {
        
            this._onFilterUser();
        },

		/*
        * Filters the business trips from the data base after status 
        * 
        * @param {Object} [oFilter] building a filter for 'equals status'
        * @param {Object} [oTileValueD] the value (empty) for the page title
        * 
        * After the binding we count the rows so the manager can see how many BTs appear for the status 
        * [oTileValueD] is set to "Business Trips" and the number of entries
        */
        _onFilterUser : function () {

            var aFilter = [];
            aFilter.push(new Filter("Status", FilterOperator.EQ, "DENIED"));

            var oValue = this.getView().byId("title_managerD");  
            var oList = this.getView().byId("table_managerD");
            var oBinding = oList.getBinding("items");
            
            oBinding.filter(aFilter);
        
            this.getView().getModel().read("/TripSet/$count", {
                filters: [aFilter],

                success: function(oData, oResponse){
                    var nCount = Number(oResponse.body);
                    oValue.setText("Business Trips (" + nCount + ")"); 
                }
            });
        },
    
        _onSearch : function (oEvent) {

            var sQuery = oEvent.getParameter("query");

            if(sQuery)
            {
                // var aFilter = [new Filter("LastName", FilterOperator.Contains, sQuery)];
                var aFilter = [];
                aFilter.push(new Filter("LastName", FilterOperator.EQ, sQuery));
                var oList = this.getView().byId("table_managerD");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
            else{
                var oList = this.getView().byId("table_managerD");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
        },

		
		/*
        * When you press the table row -> navTo detailDenied page
        * The navigation is made based on the email (from login) and id of the user
        */
        _onPress: function (oEvent) {

			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();

			this.getRouter().navTo("detailDenied",{
                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
		}
    });
});