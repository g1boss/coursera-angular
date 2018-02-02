(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuApp/templates/home.template.html'
  })

  .state('categories', {
  url: '/categories',
  templateUrl: 'src/menuApp/templates/menuCategories.template.html',
  controller: 'MenuCategoriesController as categoryList',
  resolve: {
    items: ['MenuDataService', function (MenuDataService) {
      return MenuDataService.getAllCategories();
    }]
  }
})

.state('categories.category', {
  url: '/category/:categoryId',
  templateUrl: 'src/menuApp/templates/selections.template.html',
  controller: "MenuSelectionController as category",
  resolve: {
    menuList: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
      return MenuDataService.getItemsForCategory($stateParams.categoryId);
    }]
  }
});

}

})();
