module.exports = {
   path : 'productattributes',
   method: 'post',
   resource: 'Attribute',
   op: 'create',
   serviceProvider: 'app/services/catalog/attribute/create',
   desciption: 'Create a new Product Attribute',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Employee',
   //    op: 'create'
   // }
}