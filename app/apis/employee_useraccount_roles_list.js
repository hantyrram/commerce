module.exports = {
   path : 'employees/:employee/useraccount/roles',
   method: 'get',
   resource: 'employee_userAccount_roles',
   op: 'list',
   serviceProvider: 'app/services/employee/useraccount/roles/list',
   description: 'Get Employee Roles',
   
}