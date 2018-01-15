(function () {
  'use strict';

  angular.module('SmartShoppingList', [])
  .controller('ShoppingListController', ShoppingListController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListService', ShoppingListService);

  ToBuyController.$inject = ['ShoppingListService']
  function ShoppingListController(ShoppingListService) {
    var listManager = this;

    listManager.buyList = ShoppingListService.getItemsToBuy();

    listManager.itemName = "";
    listManager.itemQuantity = "";

    listManager.addItem = function () {
      if(listManager.itemName && listManager.itemQuantity) {
        ShoppingListService.addItem(listManager.itemName, listManager.itemQuantity);
      }
    };

    listManager.buyItem = function (index) {
      ShoppingListService.buyItem(index);
    };

    listManager.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };

    listManager.everythingIsBought = function (){
      return ShoppingListService.everythingIsBought();
    };
  }

AlreadyBoughtController.$inject = ['ShoppingListService']
  function AlreadyBoughtController(ShoppingListService) {
    var purchasedItemsListManager = this;

    purchasedItemsListManager.boughtList = ShoppingListService.getItemsWeBought();

    purchasedItemsListManager.nothingIsBoughtYet = function () {
      return ShoppingListService.nothingIsBoughtYet();
    };
}

  function ShoppingListService () {
    var service = this;

    var maxItems

    // List of shopping items
    var itemsToBuy = [];
    var itemsWeBought = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getItemsWeBought = function () {
      return itemsWeBought;
    };

    service.addItem = function (itemName, quantity, purchased) {
      if ((maxItems === undefined) ||
          (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity,
        };
        itemsToBuy.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
    };

    service.buyItem = function (itemIndex) {
      var item = itemsToBuy[itemIndex];
      itemsWeBought.push(item);
      itemsToBuy.splice(itemIndex, 1);
    };

    service.everythingIsBought = function () {
      var bought = itemsWeBought.length;
      var buy = itemsToBuy.length;
      return itemsToBuy.length == 0 && itemsWeBought.length > 0;
    }

    service.nothingIsBoughtYet = function () {
      var bought = itemsWeBought.length;
      var buy = itemsToBuy.length;
      return itemsToBuy.length > 0 && itemsWeBought.length == 0;
    }
  }

})();
