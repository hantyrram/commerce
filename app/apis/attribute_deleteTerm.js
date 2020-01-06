module.exports = {
   path : 'catalog/attributes/:id/terms',
   method: 'delete',
   resource: 'Attribute$Terms',
   op: 'delete',
   serviceProvider: 'app/services/catalog/attribute/deleteTerm',
   desciption: 'Removes a term',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Employee',
   //    op: 'create'
   // }
}