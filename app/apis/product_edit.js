module.exports = {
   path : 'catalog/products',
   method: 'patch',
   resource: 'Product',
   op: 'edit',
   serviceProvider: 'app/services/catalog/product/edit',
   description: 'Update Single Product',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'ProductCategory',
   //    op: 'create'
   // }
}