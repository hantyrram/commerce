
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = useraccount_list = async (req,res,next)=>{ 
   
   let {db} = dependencies;
   
   let aggregationCursor = await db.collection('employees').aggregate([
      { 
         $match: {
            userAccount: {
               $exists: true
            }
         } 
      },
      {
         $project : {
            userAccount: 1
         }
      }
   ]);

   console.log(aggregationCursor);
   
   let resource = (await aggregationCursor.toArray()).reduce(function(acc,el){
      acc.push({ 
         _id: el._id,
         credential: el.userAccount.credential,
         roles: el.userAccount.roles
      })
      return acc;
   },[])
   
   res.json({ 
      ok: 1, 
      resource,
      resourceType:'Array', 
      resourceArrayItemType: 'UserAccount' 
   });
}


