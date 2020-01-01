module.exports = {
   path : 'catalog/attributes/:id/terms',
   method: 'patch',
   resource: 'Attribute$Terms',
   op: 'edit',
   serviceProvider: 'app/services/catalog/attribute/addTerm',
   desciption: 'Add new Term to the Attribute',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Employee',
   //    op: 'create'
   // }
}