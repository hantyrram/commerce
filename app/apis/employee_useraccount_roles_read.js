module.exports = {
   path : 'employees/:employee/useraccount/roles',
   method: 'get',
   resource: 'employee_userAccount_roles',
   op: 'read',
   serviceProvider: 'app/services/employee/useraccount/roles_read',
   description: 'Get Employee Roles',
   
}