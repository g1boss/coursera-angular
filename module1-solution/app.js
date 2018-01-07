(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.myOrder = "";
    $scope.orderStatus = "";
    $scope.textStyle = {color:'black'};

    $scope.checkOrder = function () {
      var order = new Set($scope.myOrder.toLowerCase()
                          .replace(/\s+/g,'')  // spaces
                          .replace(/,+/g,',')   // duplicate commas
                          .replace(/^[\s,]*/,'')// leading comma
                          .replace(/,+$/,'')    // trailing comma
                          .split(','));
      if (!$scope.myOrder || (order.size == 1 && order.has(""))) {
        $scope.textStyle = {color:'black'};
        $scope.orderStatus = "Please enter data first!";
      } else if (order.size < 4) {
        $scope.textStyle={color:'green'};
        $scope.orderStatus = "Enjoy!"
      } else {
        $scope.textStyle={color:'red'};
        $scope.orderStatus = "Too much!"
      }
    };
  }
})();
