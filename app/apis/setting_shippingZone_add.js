module.exports = {
   path : 'settings/shippingzone',
   method: 'post',
   resource: 'Setting$ShippingZone',
   op: 'add',
   serviceProvider: 'app/services/settings/store/shippingzone/add',
   description: 'Add a shipping zone',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'ShippingZone',
      op: 'add'
   }
}