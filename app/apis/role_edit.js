module.exports = {
   path : 'admin/roles/:role',
   method: 'patch',
   resource: 'Role',
   op: 'edit',
   serviceProvider: 'app/services/role/edit',
   description: 'Updates Role',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Role',
   //    op:'edit'
   // }
}