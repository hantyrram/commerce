module.exports = {
   path : 'employees/empid_manual',
   method: 'post',
   resource: 'Employee',
   op: 'create_empidManual',
   serviceProvider: 'app/services/employee/addWithEmpId',
   use: ['schemaValidator'],
   desciption: 'Create a new employee profile. Must provide employee id.',
   schemaValidator: {
      schema: 'Employee',
      op: 'create_empidManual'
   }
}