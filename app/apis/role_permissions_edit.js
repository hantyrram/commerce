module.exports = {
   path : 'admin/roles/:role/permissions',
   method: 'put',
   resource: 'Role$Permissions',
   op: 'edit',
   serviceProvider: 'app/services/role/permissions/edit',
   description: 'Adds Permission to Role',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Permissions',
   }
}