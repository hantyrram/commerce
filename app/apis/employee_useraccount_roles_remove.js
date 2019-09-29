module.exports = {
   path : 'employees/:employee/useraccount/roles/:role',
   method: 'delete',
   resource: 'employee_userAccount_roles',
   op: 'remove',
   serviceProvider: 'app/services/employee/useraccount/roles_remove',
   description: 'Remove Role from Employee\'s User Account.' ,
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Role',
   //    op: 'delete'
   // }
}