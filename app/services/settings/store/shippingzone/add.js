
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = settings_store_shippingzone_add = async (req,res,next)=>{ 
   //shipping zone is address
   //required = country
   let {db} = dependencies;
   
   let filter = { name: 'shippingZone' };

   let update = {
      $addToSet : {
         value: {...req.body}
      }
   }

   let options = { upsert: true};

   let settings = await db.collection('settings').updateOne(filter,update,options);
      
   console.log(settings);

   res.json({test: 1});
   
}


