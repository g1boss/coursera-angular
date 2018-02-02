(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")

MenuDataService.$inject = ['$q','$http', 'ApiBasePath'];
function MenuDataService ($q, $http, ApiBasePath) {
  var menu = this;
  menu.categories = [];
  menu.selections = [];
  menu.categoryName = "";

  menu.getCategoryName = function () {
      return menu.categoryName;
  }

  menu.getAllCategories = function () {
    var deferred = $q.defer();
    menu.categories = [];

    $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json"),
    }).then(function(response) {

      for (var i = 0, len = response.data.length; i < len; i++) {
        menu.categories.push({"name" :response.data[i].name,
          "short_name" : response.data[i].short_name});
      }
      deferred.resolve(menu.categories);
    }, function(result,status) {
      menu.categoryName = "";
      deferred.reject("The menu rest service was not accessible.");
    });
    return deferred.promise;
  };

  menu.getItemsForCategory = function (category) {
    var deferred = $q.defer();
    menu.selections = [];

    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category="+category),
    }).then(function(response) {

      menu.categoryName = response.data.category.name;

      for (var i = 0, len = response.data.menu_items.length; i < len; i++) {
        var item = response.data.menu_items[i];
        menu.selections.push({
          "name" :item.name,
          "description" : item.description,
          "price" : item.price_large });
      }
      deferred.resolve(menu.selections);
    }, function(result,status) {
      menu.categoryName = "";
      deferred.reject("The menu rest service was not accessible.");
    });
    return deferred.promise;
  };
}

})();
