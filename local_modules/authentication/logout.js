//authentication module should provide the login service it's the equivalent to passport.authenticate
/**
 * @type {HT~service}
 * @module Authentication/logout
 * @desc logs out a user.
 */
module.exports = logout = (req,res)=>{
 req.logout();
 res.clearCookie('U_SID');
 res.json({status:'ok',source:'logout',message:'You have been logged out!'});
}