module.exports = {
   path : 'productattributes/:id/terms/remove',
   method: 'patch',
   resource: 'Attribute$Terms',
   op: 'edit',
   serviceProvider: 'app/services/catalog/attribute/deleteTerm',
   desciption: 'Removes a term',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Employee',
   //    op: 'create'
   // }
}