module.exports = {
   path : 'employees/:employee/useraccount/roles',
   method: 'get',
   resource: 'Employee$UserAccount$Roles',
   op: 'list',
   serviceProvider: 'app/services/employee/useraccount/roles/list',
   description: 'Get Employee Roles',
   
}