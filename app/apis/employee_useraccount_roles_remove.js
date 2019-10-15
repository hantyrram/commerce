module.exports = {
   path : 'employees/:employee/useraccount/roles/:role',
   method: 'delete',
   resource: 'Employee$UserAccount$Roles',
   op: 'remove',
   serviceProvider: 'app/services/employee/useraccount/roles/remove',
   description: 'Remove Role from Employee\'s User Account.' ,
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Role',
   //    op: 'delete'
   // }
}