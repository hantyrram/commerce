module.exports = {
   path : 'admin/roles',
   method: 'post',
   resource: 'Role',
   op: 'create',
   serviceProvider: 'app/services/role/create',
   description: 'Creates a new Role',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Role',
      op:'create'
   }
}