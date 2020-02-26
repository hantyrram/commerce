module.exports = {
   path : 'roles/:role/permissions',
   method: 'patch',
   resource: 'Role$Permissions',
   op: 'edit',
   serviceProvider: 'app/services/role/permissions/edit',
   description: 'Adds Permission to Role',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Permissions',
   }
}