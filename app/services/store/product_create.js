//service name is important
//product_create
module.exports =  product_create = (req,res,next)=>{
 res.json({message:'Accessing Product'});
}

module.exports.requiresPermission = true;

