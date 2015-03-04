'use strict';

/**@ngInject*/
var AdminAddAlertController = function(alert, currentUser) {
    this.alert = alert;
    this.currentUser = currentUser;
    console.log("AdminAddAlertController.currentUser: " + this.currentUser);
    console.log("AdminAddAlert.currentUser.Stringify: " + JSON.stringify(this.currentUser));
};

AdminAddAlertController.resolve = {
    /**@ngInject*/
    alert: function(AlertsResource) {
        return new AlertsResource();
    }
};

AdminAddAlertController.prototype = {

};

module.exports = AdminAddAlertController;
