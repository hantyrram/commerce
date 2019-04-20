/**
 * @func attachArtifactToResponse
 * @memberof middlewares
 * @type {typedefs~middleware}
 * @desc Attaches the @see{@link{Artifact}} to the response object. So that can be easily accessed by any service.
 */
module.exports = attachArtifactToResponse = (req,res,next)=>{
 res.Artifact = require('../Artifact');
 next();
}