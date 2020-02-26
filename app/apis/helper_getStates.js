module.exports = {
   path : 'helpers/getStates/:country?',
   method: 'get',
   resource: 'States',   
   op: 'list',
   serviceProvider: 'app/services/helpers/getStates',
   description: 'Retrieve States',
}