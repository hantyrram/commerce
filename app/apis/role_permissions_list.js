module.exports = {
   path : 'admin/roles/:role/permissions',
   method: 'get',
   resource: 'Role$Permissions',
   op: 'read',
   serviceProvider: 'app/services/role/permissions/list',
   description: 'Fetch A Role\'s Permissions',
   
}