module.exports = {
   path : 'catalog/attributes',
   method: 'get',
   resource: 'Attribute',
   op: 'list',
   serviceProvider: 'app/services/catalog/attribute/list',
   desciption: 'Retrieve Product Attributes',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Employee',
   //    op: 'create'
   // }
}