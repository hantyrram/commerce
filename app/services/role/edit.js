
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);


/**
 * @type {HT~service}
 * @func role_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = role_edit = async (req,res,next)=>{ 
   
   let {db} = dependencies;
   
   console.log('Dating Role',req.preLoadedResource['Role']);
   console.log('Role Na Ni Sumbit',req.body);
   console.log('Service Not Yet Implemented')
   // res.json({
   //    ok:1,
   //    resource: req.body,
   //    resourceType: 'Role',
   //    resourceHref: '/apiv1/admin/roles/' + req.preLoadedResource['Role']._id
   // })
   res.json({
      error: {
         type: 'ROLE_EDIT_FAILED',
         text: 'Service Not Yet Implemented'
      }
   })
}


