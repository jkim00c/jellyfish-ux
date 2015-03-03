'use strict';

/**@ngInject*/
var AdminEditAlertController = function(alert) {
    this.alert = alert;
};

AdminEditAlertController.resolve = {
    /**@ngInject*/
    alert: function(AlertsResource, $stateParams) {
        return AlertsResource.get({id: $stateParams.id}).$promise;
    }
};

AdminEditAlertController.prototype = {

};

module.exports = AdminEditAlertController;
