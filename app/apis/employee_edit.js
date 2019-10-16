module.exports = {
   path : 'employees/:employee',
   method: 'patch',
   resource: 'Employee',
   op: 'edit',
   serviceProvider: 'app/services/employee/edit',
   description: 'Edit Employee.',
   use: ['schemaValidator'],
   schemaValidator: {//schemaValidator options
      schema: 'Employee',
      op: 'edit',
   }
}