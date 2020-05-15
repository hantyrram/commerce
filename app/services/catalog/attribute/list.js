const {dependencies} = require(DEPENDENCY_MANAGER_PATH);

module.exports = attribute_list = async (req,res,next)=>{
   let {db} = dependencies;
   try {
      let attributes = await db.collection('attributes').find({}).toArray();  
      res.json({ 
         ok:1, 
         resource: attributes,
         resourceType: 'Array',
         resourceItemType: 'Attribute'
      });

   } catch (error) {
      console.log(error);
      res.json({
         error: {
            type: 'SERVER_ERROR',
            text: 'Error Fetching Attributes. Contact Administrator.'
         }
      })
   }
   

 

}