module.exports = {
   path : 'admin/roles/:role',
   method: 'delete',
   resource: 'role',
   op: 'delete',
   serviceProvider: 'app/services/role/delete',
   description: 'Remove Role',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Role',
   //    op:'edit'
   // }
}