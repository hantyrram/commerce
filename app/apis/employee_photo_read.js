module.exports = {
   path : 'employees/:employee/photo',
   method: 'get',
   resource: 'Employee$Photo',
   op: 'read',
   serviceProvider: 'app/services/employee/photo/read',
   description: 'Get Employee Avatar'
}