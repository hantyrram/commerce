
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = settings_store_list = async (req,res,next)=>{ 
   
   let {db} = dependencies;
   
   let settings = await db.collection('settings').find({}).toArray();
   
   res.json({settings});
}


