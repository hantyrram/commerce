module.exports = {
   path : 'admin/roles/:role',
   method: 'get',
   resource: 'role',
   op: 'read',
   serviceProvider: 'app/services/admin/role/read',
   description: 'Get a single Role.',
}