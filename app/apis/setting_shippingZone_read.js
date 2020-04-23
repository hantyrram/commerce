module.exports = {
   path : 'settings/shippingzone',
   method: 'get',
   resource: 'Setting$ShippingZone',
   op: 'add',
   serviceProvider: 'app/services/settings/store/shippingzone/read',
   description: 'Fetch shipping zone setting'
}