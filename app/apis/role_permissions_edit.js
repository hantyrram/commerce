module.exports = {
   path : 'admin/roles/:role/permissions',
   method: 'put',
   resource: 'role_permissions',
   op: 'edit',
   serviceProvider: 'app/services/admin/role/permissions/edit',
   description: 'Adds Permission to Role',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Permissions',
   }
}