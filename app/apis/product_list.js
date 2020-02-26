module.exports = {
   path : 'products',
   method: 'get',
   resource: 'Product',
   op: 'list',
   serviceProvider: 'app/services/catalog/product/list',
   description: 'Retrieve Products',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'ProductCategory',
   //    op: 'create'
   // }
}