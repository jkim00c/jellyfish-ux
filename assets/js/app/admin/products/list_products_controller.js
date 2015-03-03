'use strict';

var _ = require('lodash');

/**@ngInject*/
function ListProductsController(products, categories) {
  var self = this;

  this.products = products;
  this.categories = categories;

  _.each(this.categories, function(category) {
    category.products = _.filter(self.products, function(product) {
      return product.product_type_id == category.id;
    });
  });
}

ListProductsController.resolve = {
  /**@ngInject*/
  products: function(ProductsResource) {
    return ProductsResource.query().$promise;
  }
};

module.exports = ListProductsController;
