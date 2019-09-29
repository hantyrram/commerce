module.exports = {
   path : 'employees/:employee/useraccount/roles',
   method: 'put',
   resource: 'employee_userAccount_roles',
   op: 'add',
   serviceProvider: 'app/services/employee/useraccount/roles_add',
   description: 'Adds Role to Employee',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Role',
      op: 'assign'
   }
}