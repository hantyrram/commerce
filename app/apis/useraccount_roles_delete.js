module.exports = {
   path : 'useraccounts/:username/roles/:role',
   method: 'delete',
   resource: 'UserAccount$Roles',
   op: 'delete',
   serviceProvider: 'app/services/useraccount/roles/remove',
   description: 'Remove Role From User Account'
}