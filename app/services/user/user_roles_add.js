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
 

 // >> i click on user e.g. Ronskie
 // >> i click on add role > 
 // >> display me a list of roles > get_roles [return God's role]
 // updating a role that are embedded > check it on God > if it exists then update God > others