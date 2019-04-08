const ObjectID = require('mongodb').ObjectID;

/**
 * @type {HT~service}
 * @func user_add_role
 * @memberof Services
 * @desc Adds a new permission.
 */
module.exports = user_roles_add = async (req,res,next)=>{
  let DB = req.app.get('db');
  //if God already owns the role && owner is not specified
}
 
 module.exports.label = 'Add Role To User';
 

 