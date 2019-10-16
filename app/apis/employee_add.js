module.exports = {
   path : 'employees',
   method: 'post',
   resource: 'Employee',
   op: 'create',
   serviceProvider: 'app/services/employee/add',
   use: ['schemaValidator'],
   desciption: 'Create a new employee profile. Generating employee id automatically.',
   schemaValidator: {
      schema: 'Employee',
      op: 'create'
   }
}