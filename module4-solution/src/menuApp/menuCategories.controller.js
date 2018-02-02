(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuCategoriesController', MenuCategoriesController);


MenuCategoriesController.$inject = ['MenuDataService', 'items', '$state'];
function MenuCategoriesController(MenuDataService, items, $state) {
  var categoryList = this;
  categoryList.items = items;
  categoryList.state = $state;
  categoryList.somethingIsSelected = MenuDataService.getCategoryName() ? true : false;
}

})();
