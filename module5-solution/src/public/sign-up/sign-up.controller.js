(function() {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MembershipService','MenuService','$scope'];
  function SignUpController(MembershipService, MenuService, $scope) {
    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.favoriteInvalidMessage = "";

    $ctrl.addUser = function () {
      $ctrl.favoriteInvalidMessage = "";
      var promise = MenuService.validateMenuItem($ctrl.user.favorite);
      promise.then(
        function(result) {
          $ctrl.savedMessage = MembershipService.addUser($ctrl.user);
        },
        function(error) {
          if($ctrl.user.favorite) {
            $ctrl.favoriteInvalidMessage = "No such item number.";
          } else {
            $ctrl.savedMessage = MembershipService.addUser($ctrl.user);
          }
        });
        $scope.signUpForm.$setPristine();
    };
  }

})();
