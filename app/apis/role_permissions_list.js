module.exports = {
   path : 'admin/roles/:role/permissions',
   method: 'get',
   resource: 'role_permissions',
   op: 'read',
   serviceProvider: 'app/services/admin/role/permissions/list',
   description: 'Fetch A Role\'s Permissions',
   
}