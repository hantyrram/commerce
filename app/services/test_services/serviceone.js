module.exports = function serviceone_read(req,res,next){

   res.json({service: 'serviceone_read'});
}

module.exports.apiVersion = 1;


//permission required = {test: {read: 1}}
//"employee.credential" "read" = {employee$credential:{read:1}}
//present on front end as
// resource                permissions
// permission              [checked] Read 
// employee.credential     [checked] Read

//get the services,
//auth$login_login()
