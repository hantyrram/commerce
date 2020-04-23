module.exports = {
   path : 'products/:product_id',
   method: 'patch',
   resource: 'Product',
   op: 'edit',
   serviceProvider: 'app/services/catalog/product/edit',
   description: 'Update Single Product',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Product',
      op: 'edit'
   }
}