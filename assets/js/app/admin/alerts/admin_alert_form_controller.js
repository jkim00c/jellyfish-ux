'use strict';

var _ = require('lodash');

var adminAlertsListState = 'base.admin.alerts.list';

/**
 * @todo This mirrors the admin_user_form_controller.js file in a lot of regards, could be abstracted.
 */

/**@ngInject*/
var AdminAlertFormController = function($state) {

    this.$state = $state;
    this.alert = null;
    this.formSubmitted = false;
    this.currentUser = AdminAlertFormController.currentUser;
    // Set the available roles.
    // @todo Should probably be pulled from the backend
    // @todo For some reason ui-select goes nuts if this is returned from a method.
    this.statuses = [
        {
            value: 'OK',
            name: 'OK'
        },
        {
            value: 'WARNING',
            name: 'Warning'
        },
        {
            value: 'CRITICAL',
            name: 'Critical'
        },
        {
            value: 'UNKNOWN',
            name: 'Unknown'
        },
        {
            value: 'PENDING',
            name: 'Pending'
        }
    ];

};

AdminAlertFormController.prototype = {

    /**
     * Take the alert resource from the parent (edit/add).
     *
     * @param parent
     */
    initForm: function(parent) {
        this.alert = parent.alert;
        this.alert.project_id = '0';
        this.alert.order_item_id = '0';
        console.log("currentUser: " + parent.currentUser);
        console.log("currentUserStringify: " + JSON.stringify(parent.currentUser));
        this.alert.staff_id = parent.currentUser.id;

    },

    create: function() {
        console.log("CREATE!");
        console.log("this.alert.message: " + this.alert.message);
        console.log("this.alert.status: " + this.alert.status);
        console.log("this.alert.project_id: " + this.alert.project_id);
        console.log("this.alert.order_item_id: " + this.alert.order_item_id);
        console.log("this.alert.staff_id: " + this.alert.staff_id);
        this.formSubmitted = true;
        if (this.form.$invalid) {
            return false;
        }

        this.alert.$save(_.bind(function() {
            this.$state.go(adminAlertsListState);
        }, this), _.bind(function(response) {
            this._handleServerErrors(response.data.errors);
        }, this));

    },

    update: function() {
        this.formSubmitted = true;
        if (this.form.$invalid) {
            return false;
        }

        this.alert.$update(_.bind(function() {
            this.$state.go(adminAlertsListState);
        }, this), function(response) {
            this._handleServerErrors(response.data.errors);
        });
    },

    destroy: function() {
        this.formSubmitted = true;
        this.alert.$delete(_.bind(function() {
            this.$state.go(adminAlertsListState);
        }, this), function(response) {
            this._handleServerErrors(response.data.errors);
        });
    },

    canSubmit: function() {
        return !this.formSubmitted || (this.form.$dirty && this.form.$valid);
    },

    hasError: function(field, validation) {
        // Only show validation errors on submit; Avoids angulars hasty error messaging
        if (validation) {
            return this.formSubmitted && this.form[field].$error[validation];
        }
        return this.formSubmitted && this.form[field].$invalid;
    },

    /**
     * Since we can't easily validate the error coming from the server, we use ng-change
     * to clear the error when the user updates the field.  This way the form will allow a resubmit.
     *
     * @param field
     */
    clearSubmitError: function(field) {
        delete this.form[field].$error.submitError;

        if (this.form[field].$error.length === 0) {
            this.form[field].$invalid = false;
        }
    },

    /**
     * Get the submit error value.
     *
     * @param field
     * @returns {*}
     */
    getSubmitErrorValue: function(field) {
        return this.form[field].$error.submitError;
    },

    /**
     * Parse the errors from the server, Set the invalid flag, error flag for the server.
     * @param errors
     * @private
     */
    _handleServerErrors: function(errors) {

        var form = this.form;

        _.each(errors, function(errorArray, fieldName) {
            form[fieldName].$error.submitError = '';

            _.each(errorArray, function(error) {
                var formattedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();
                form[fieldName].$error.submitError += formattedFieldName + ' ' + error + ' ';
            });

            form[fieldName].$invalid = true;
        });
    }
};


module.exports = AdminAlertFormController;
