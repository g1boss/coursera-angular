(function () {
  'use strict';

  angular.module('NarrowItDown', ['ui.grid'])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItems);


function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      grid: '<gridData',
      show: '<showGrid',
      message: '<message'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list'
  };
  return ddo;
}

FoundItemsDirectiveController.$inject = ['MenuSearchService']
function FoundItemsDirectiveController(MenuSearchService) {
  var foundItems = this;

  foundItems.removeRow = function (row) {
    MenuSearchService.removeRow(row);
  };
}

  NarrowItDownController.$inject = ['$q','MenuSearchService'];
  function NarrowItDownController ($q, MenuSearchService) {
    var dialog = this;
//    var removeTemplate = '<button class="btn btn-danger" ng-click="grid.appScope.removeRow(row)"><i class="glyphicon glyphicon-remove"></i>DEL</button>';
    var removeTemplate = '<input type="button" value="Don\'t Want this one!" ng-click="grid.appScope.list.removeRow(row);" class="btn btn-warning" />';

    dialog.searchString;
    dialog.showGrid = false;
    dialog.message = "";
    dialog.gridData = {
                      showSelectionCheckbox: true,
                      columnDefs: [
                      { field: 'remove', displayName: '', width: 140, cellTemplate: removeTemplate },
                      { field: 'name', displayName: 'Menu Item', width: 300, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD }}</div>'},
                      { field: 'short_name', displayName: 'Short Name', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD }}</div>'},
                      { field: 'description', displayName: 'Description'}
                      ]
                    };

    dialog.narrowItDown = function () {
      if(dialog.searchString) {
        dialog.message = "";
        dialog.showGrid = false;
        MenuSearchService.getMatchedMenuItems(dialog.searchString)
        .then(function (response) {
          console.log("success");
          if(!response|| response === 0 ) {
            dialog.message = "No results found.";
            console.log(dialog.message);
            dialog.gridData.data = [];
          } else {
            dialog.showGrid = true;
            dialog.gridData.data = MenuSearchService.getFoundItems();
          }
        })
        .catch(function (error, status) {
          console.log(error);
          dialog.message = "There was an error " + status;
          dialog.gridData.data = [];
        });
      } else {
        dialog.message = "Enter menu search terms."
      }
    };

    dialog.removeRow = function (row) {
      MenuSearchService.removeRow(row);
    };
  }

  MenuSearchService.$inject = ['$q','$http', 'ApiBasePath'];
  function MenuSearchService ($q, $http, ApiBasePath) {
    var search = this;

    search.found = [];

    search.getFoundItems = function () {
      return search.found;
    }

    search.getMatchedMenuItems = function (searchTerm) {
      var deferred = $q.defer();
      search.found = [];

      $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then(function(response) {
        if(searchTerm) {
          for (var i = 0, len = response.data.menu_items.length; i < len; i++) {
            var item = response.data.menu_items[i].name;
            if(item.toLowerCase().includes(searchTerm.toLowerCase())) {
              search.found.push(
                {"name" :response.data.menu_items[i].name,
                 "short_name" : response.data.menu_items[i].short_name,
                 "description" : response.data.menu_items[i].description}
               );
            }
          }
        }
        deferred.resolve(search.found.length);
      }, function(result,status) {
          deferred.reject("The menu rest service was not accessible.");
      });
      return deferred.promise;
    };

    search.removeRow = function(row) {
      var index = search.found.indexOf(row.entity);
      if (index !== -1) {
          search.found.splice(index, 1);
      }
    };

  }

})();
