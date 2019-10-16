module.exports = {
   path : 'employees/:employee/useraccount/roles',
   method: 'put',
   resource: 'Employee$UserAccount$Roles',
   op: 'add',
   serviceProvider: 'app/services/employee/useraccount/roles/add',
   description: 'Adds Role to Employee',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Role',
      op: 'assign'
   }
}