(function() {
  "use strict";

  angular.module('common')
  .service('MembershipService', MembershipService);

  MembershipService.$inject = [];
  function MembershipService() {
    var $ctrl = this;
    $ctrl.users = {};
    $ctrl.loggedInUser = "";

    $ctrl.addUser = function (user) {
      $ctrl.users[user.firstName + " " + user.lastName] = user;
      $ctrl.loggedInUser = user.firstName + " " + user.lastName;
      return "Your membership data has been saved.";
    };

    $ctrl.getUser = function () {
      return $ctrl.users.pop;
    };

    $ctrl.getCurrentMemberInfo = function () {
      return $ctrl.users[$ctrl.loggedInUser];
    };
  }

})();
