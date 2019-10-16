module.exports = {
   path : 'employees/:employee/useraccount/credential/revoke',
   method: 'patch',
   resource: 'Employee$UserAccount$Credential',
   op: 'revoke',
   serviceProvider: 'app/services/employee/useraccount/credential/revoke',
   description: 'Revokes employee credential',
}