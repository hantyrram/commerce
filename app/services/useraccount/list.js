

const { dependencies } = require(`${APP_ROOT}/dependencyManager`);

/**
 * @type {HT~service}
 * @func useraccount_list
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = useraccount_list = async (req,res,next)=>{ 
   const { db } = dependencies;
   try {
      let aggregationCursor = await db.collection('employees').aggregate(
         [
            { 
               $match : {
                  userAccount: {
                     $exists: true
                  }
               } 
            },
            {
               $project : {
                  userAccount: 1,
                  employeeId: 1
               }
            },
            {
               //merges {_id : employee._id, remove} deconstructs $userAccount to the first array element consisting same prop
               "$replaceWith": { $mergeObjects: [{ _owner: "$employeeId", credential:null, roles: null },"$userAccount"]}
            }
         ]
      );

      let userAccounts = await aggregationCursor.toArray();

      res.json({
         ok: 1,
         resource: userAccounts,
         resourceType: 'Array',
         resourceArrayItemType: 'UserAccount'
      })
      
   } catch (error) {
      console.log('Err: useraccount_list ',error);
      res.json({
         error: {
            type: 'SERVER_ERROR',
            text: 'Error executing the useraccount.list service. Contact Administrator!'
         }
      })
   }

}


