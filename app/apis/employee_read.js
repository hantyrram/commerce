module.exports = {
   path : 'employees/:employee',
   method: 'get',
   resource: 'Employee',
   op: 'read',
   serviceProvider: 'app/services/employee/read'
}