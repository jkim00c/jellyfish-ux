'use strict';

/**@ngInject*/
module.exports = function($rootScope, $log, $location, fixSidebar, AuthService, User, Session, $urlRouter) {

  $rootScope.sideBarExpanded = true;

  // catch any error in resolve in state
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    alert('Error occurred: ' + (error.statusText || error.message));
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $("html, body").animate({scrollTop: 0}, 200);
  });

  $(window).resize(fixSidebar);

  // auto close popup on body click
  $("body").click(function(e) {
    var $target = $(e.target);
    if ($target.closest('.drop-down-box').length && $target.closest('.keep-drop-down-open').length) {
      return false;
    }
    $(".drop-down-box").addClass('hide');
  });

  // On init we check the current user to see if we are already authenticated.
  // If we are, we create the session and and sync the routes.
  var currentUser = User.getCurrentUser();
  currentUser.$promise.then(function(data) {
    Session.create(data.email, data.role);
    $urlRouter.sync();
  }, function() {
    $location.path('/');
  });

  // Authorization and Authentication when switching Pages.
  $rootScope.$on('$stateChangeStart', function (event, next) {

    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {

      // Block all routing until the current user is loaded for the first time.
      // After authorization check because public routes do not need currentUser to verify.
      if (!currentUser.$resolved) {
        event.preventDefault();
        return;
      }
      
      $location.path('/');
    }
  });
};