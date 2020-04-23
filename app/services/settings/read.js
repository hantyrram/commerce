
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = settings_read = async (req,res,next)=>{ 
   
   let {db} = dependencies;
   
   let settings = await db.collection('settings').find({}).toArray();
   
   console.log('settings_read',settings);
   res.json({
      ok: 1,
      resource: settings,
      resourceType: 'Setting'
   });
}


