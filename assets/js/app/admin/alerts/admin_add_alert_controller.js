'use strict';

/**@ngInject*/
var AdminAddAlertController = function(alert) {
    this.alert = alert;
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
