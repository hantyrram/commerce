const {dependencies} = require(DEPENDENCY_MANAGER_PATH);

module.exports = employee_list = async (req,res,next)=>{
   let {db} = dependencies;
   try {
      let productCategories = await db.collection('productCategories').find({}).toArray();  
      console.log(productCategories);
      res.json({ 
         ok:1, 
         resource: productCategories,
         resourceType: 'Array',
         resourceItemType: 'ProductCategory'
      });

   } catch (error) {
      console.log(error);
      res.json({
         error: {
            type: 'SERVER_ERROR',
            text: 'Error Fetching Categories. Contact Administrator.'
         }
      })
   }
   

 

}