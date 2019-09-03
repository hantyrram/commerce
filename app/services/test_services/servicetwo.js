module.exports = function servicetwo_read(req,res,next){

   res.json({service: 'servicetwo_read'});
}


module.exports.apiVersion = 1; //default equals to 1
