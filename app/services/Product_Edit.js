
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const ObjectId = require('mongodb').ObjectId;
/**
 * @type {HT~service}
 * @func product_edit
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = product_edit = async (req,res,next)=>{ 
   
   let {db} = dependencies;
   
   try {

      await db.collection('products').createIndex({"name" : 1},{unique: 1});

      console.log(req.body);

      let product = Object.assign({},req.body);

      delete product._id;

      let result = await db.collection('products').updateOne(
         { _id:ObjectId(req.body._id)},
         {
            $set: hantyr.function.flatten(product)
         }
      );
      console.log(result);
  
      let {nModified,ok} = result.result;

      if(ok){
         if(nModified === 0){
            res.json({
               ok,
               resource: req.body,
               resourceType: 'Product',
               message: {
                  type: 'INFO',text: 'No changes made.'
               }
            });
            return;
         }
         res.json({
            ok,
            resource: req.body,
            resourceType: 'Product',
            message: {
               type: 'SUCCESS', text: `${req.body._id} update success!`
            }
         });
      }

   } catch (error) {
      console.log(error);
      if(error.code === 11000){
         res.json({
            error: {
               type: 'DUPLICATE_ERROR',
               text: `${error.keyValue.name} already exist.`
            }
         });
         return;
      }
      res.json({
         error: {
            type: 'SERVER_ERROR',
            text: 'Error Updating Product. Contact Admin.'
         }
      })
   }
}

module.exports.api = {
   path : 'catalog/products',
   method: 'patch',
   resource: 'Product',
   op: 'edit',
   serviceProvider: 'app/services/catalog/product/edit',
   description: 'Update Single Product',
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'ProductCategory',
   //    op: 'create'
   // }
}

