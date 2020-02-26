module.exports = {
   path : 'roles/:role',
   method: 'get',
   resource: 'Role',
   op: 'read',
   serviceProvider: 'app/services/role/read',
   description: 'Get a single Role.',
}