const path = require('path');


module.exports = resource_list = async (req,res,next)=>{

   let apis = req.app.get('apis');

   let resources = [];

   for(let api of apis){
      let { path: location, resource, description} = api;
      resources.push({location,resource,description});
   }

   console.log(resources);
   res.json( 
      {
         ok:1, 
         // resource: hantyr.getPermissions(req.app.get('apis')),
         resource: resources,
         resourceType: 'Array',
         resourceArrayItemType: 'Resource'
      } 
   );
  
}