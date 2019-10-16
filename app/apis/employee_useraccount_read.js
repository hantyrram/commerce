module.exports = {
   path : 'admin/useraccounts/:employeeId',
   method: 'get',
   resource: 'Employee$UserAccount',
   op: 'read',
   serviceProvider: 'app/services/employee/useraccount/read',
   description: 'Gets The Employee\'s User Account',
   
}