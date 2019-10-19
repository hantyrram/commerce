module.exports = {
   path : 'employees/:employee/photo',
   method: 'post',
   resource: 'Employee$Photo',
   op: 'edit',
   serviceProvider: 'app/services/employee/photo/edit'
}