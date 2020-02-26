module.exports = {
   path : 'admin/settings/store',
   method: 'get',
   resource: 'Settings$Store',
   op: 'list',
   serviceProvider: 'app/services/settings/store/list',
   description: 'Retrieve Store Settings',
}