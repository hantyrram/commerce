module.exports = {
   path : 'catalog/productcategories',
   method: 'post',
   resource: 'ProductCategory',
   op: 'create',
   serviceProvider: 'app/services/catalog/productcategory/create',
   description: 'Create New Product Category',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'ProductCategory',
      op: 'create'
   }
}