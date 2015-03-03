'use strict';

/**@ngInject*/
var ListAlertsController = function(alerts) {
    this.alerts = alerts;
};

ListAlertsController.resolve = {
    /**@ngInject*/
    alerts: function(AlertsResource) {
        return AlertsResource.query().$promise;
    }
};

ListAlertsController.prototype = {

};

module.exports = ListAlertsController;
