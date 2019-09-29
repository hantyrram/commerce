const path = require('path');


module.exports = permission_list = async (req,res,next)=>{

   res.json( 
      {
         ok:1, 
         resource: hantyr.getPermissions(req.app.get('apis')),
         resourceType: 'Array',
         resourceArrayItemType: 'Permission'
      } 
   );
  
}