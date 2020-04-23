
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = settings_store_shippingzone_read= async (req,res,next)=>{ 
   //shipping zone is address
   //required = country
   let {db} = dependencies;
   
   let filter = { name: 'shippingZone' };

   let result = await db.collection('settings').findOne(filter);
      
   res.json({
      ok:1,
      resource : result,
      resourceType : 'Setting$ShippingZone'
   });
   
}


