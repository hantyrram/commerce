/**
 * @namespace Config.middlewares
 * @desc Middlewares MUST be registered here before use. Adding middleware here does not signify it's use.
 * 
 */
module.exports = [
  '/app/middlewares/logger',
  '/app/middlewares/handleNonXHR',
  '/app/middlewares/attachCurrentServiceToReq',
  '/app/middlewares/attachArtifactToResponse',
  '/app/middlewares/validateSchema'
]