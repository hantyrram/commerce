module.exports = {
   path : 'catalog/products',
   method: 'post',
   resource: 'Product',
   op: 'create',
   serviceProvider: 'app/services/catalog/product/create',
   description: 'Create New Product',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'ProductCategory',
   //    op: 'create'
   // }
}