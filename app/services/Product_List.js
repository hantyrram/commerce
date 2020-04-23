const {dependencies} = require(DEPENDENCY_MANAGER_PATH);

module.exports = product_list = async (req,res,next)=>{
   let {db} = dependencies;
   try {
      let products = await db.collection('products').find({}).toArray();  
      res.json({ 
         ok:1, 
         resource: products,
         resourceType: 'Array',
         resourceItemType: 'Product'
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


module.exports.api = {
   path : 'products',
   method: 'get',
   resource: 'Product',
   op: 'list',
   description: 'Retrieve Products',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'ProductCategory',
   //    op: 'create'
   // }
}