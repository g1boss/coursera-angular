(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuSelectionController', MenuSelectionController);


MenuSelectionController.$inject = ['MenuDataService','menuList', '$state'];
function MenuSelectionController(MenuDataService, menuList, $state) {
  var category = this;
  category.state = $state;
  category.name = MenuDataService.getCategoryName();
  category.selections = {};
  category.selections.data = menuList;

 }

})();
