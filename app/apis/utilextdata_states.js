module.exports = {
   path : 'util/extdata/states/:country?',
   method: 'get',
   resource: 'States',   
   op: 'list',
   serviceProvider: 'app/services/helpers/getStates',
   description: 'Retrieve States',
}