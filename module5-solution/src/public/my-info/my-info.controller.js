(function () {
"use strict";

// angular.module('public')
// .component('myInfo', {
//   templateUrl: 'src/public/my-info/my-info.html',
//   bindings: {
//     memberInfo: '<'
//   },
//   controller: MyInfoController
// });

 angular.module('public')
 .controller('MyInfoController',MyInfoController);

MyInfoController.$inject = ['MenuService','ApiPath','memberInfo'];
function MyInfoController(MenuService, ApiPath, memberInfo) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  $ctrl.loggedIn = false;
  $ctrl.memberInfo = {};
  $ctrl.favorite = {};

  if(memberInfo) {
    $ctrl.loggedIn = true;
    $ctrl.memberInfo = memberInfo;
    MenuService.getMenuItem($ctrl.memberInfo.favorite)
    .then(function(menuItem){
      $ctrl.favorite = menuItem;
    });
  };
}

})();
