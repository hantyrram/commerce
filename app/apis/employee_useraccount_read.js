module.exports = {
   path : 'employees/:employee/useraccount',
   method: 'get',
   resource: 'employee_userAccount',
   op: 'read',
   serviceProvider: 'app/services/employee/useraccount/read',
   description: 'Gets The Employee\'s User Account',
   
}