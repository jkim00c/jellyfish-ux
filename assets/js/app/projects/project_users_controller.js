'use strict';

var _ = require('lodash');

/**@ngInject*/
var ProjectUsersController = function($scope, $modalInstance, $q, $state, project, ProjectUsersResource, apiResource) {

  $scope.searchURL = apiResource("staffSearch");
  $scope.search = "";
  $scope.userAdditons = {};
  $scope.userAdditonCount = 0;
  $scope.updating = false;

  $scope.$watch('lastSelected', function(newUser, lastUser) {
    if (newUser && newUser != lastUser) {
      $scope.userAdditons[newUser.originalObject.email] = newUser;
      $scope.userAdditonCount = Object.keys($scope.userAdditons).length;
    }
  });

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  //todo: move the following methods to the controller prototype.
  $scope.ok = function ($event) {

    var criticalError = false;
    var duplicateRecord = false;
    var userInserts = [];

    $scope.updating = true;

    userInserts = _.map(Object.keys($scope.userAdditons), function(key) {
      var user = $scope.userAdditons[key].originalObject;

      return ProjectUsersResource.save({id: project.id, staff_id: user.id}).$promise.then(
        function(data){
        }, function(error) {
          // @todo We should use a code here not a string match.
          if (error.data.error === "Duplicate record.") {
            duplicateRecord = true;
          } else {
            criticalError = true;
          }
        });
    });

    $q.all(userInserts).finally(function() {
      $scope.updating = false;

      if (criticalError) {
        alert("There was a problem adding these users. Please try again.");
      }

      // Refetch the project to reload the users.
      project.$get();

      $modalInstance.close();
    });
  };

  $scope.removeUser = function(email) {
    delete $scope.userAdditons[email];
    $scope.userAdditonCount = Object.keys($scope.userAdditons).length;
  };
};

module.exports = ProjectUsersController;