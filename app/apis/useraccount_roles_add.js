module.exports = {
   path : 'useraccounts/:username/roles',
   method: 'post',
   resource: 'UserAccount$Roles',
   op: 'add',
   serviceProvider: 'app/services/useraccount/roles/add',
   description: 'Add Role To User Account',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Role',
      op: 'assign'
   }
}