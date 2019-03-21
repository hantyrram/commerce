
const uuidv4 = require('uuid/v4');//connect session
// const uuidv5 = require('uuid/v5');//for uses sessionnpm
const session = require('./session');
const Cookie = require('./Cookie');
const redis = require('redis');
const DEFAULT_SESSION_EXPIRY = 60*60; // 1 HOUR


/**
 * @module session-on-redis
 */

/**
 * 
 * @param {object} opt - The cookie options.
 */
module.exports = (opt = {cookie:{},store:{}})=>{
 
  let Session;
  if(!opt.redisClient){
   Session = session(redis.createClient());
  }else{
   Session = session(opt.redisClient);
  }
  
  let options = {
   cookie: {
    name: opt.cookie.name || 'U_SID',
    expires: opt.cookie.expires || null,
    path: opt.cookie.path || '/',
    sameSite: opt.cookie.sameSite || null,
    httpOnly: opt.cookie.httpOnly || false,
    secure: opt.cookie.secure || false,
    domain: opt.cookie.domain || null,
   },
   store:{//expiry of session on redis store,use cookie expiry, otherwise default to 1 hour
     expire : opt.cookie.expires? opt.cookie.expires: DEFAULT_SESSION_EXPIRY
   }
  }

  return async function(req,res,next){
    //check if there is no session cookie
    if(!req.cookies[options.cookie.name]){
      let session = new Session();
      let cookie = new Cookie(options.cookie);
      //h_sid = encypretdSessionidAsCookieValue
      try {
        await session.setCookie(res,cookie);
        session.expire = options.store.expire;
        session.save();
        req.session = session;
      } catch (error) {
        console.log({sor:error});
        next(error);
      }
      next();
      return;
    }
    //with U_SID cookie 
    try {
      //find the session from the store
      let sessionFound = await Session.find(req.cookies[options.cookie.name]);
      if(sessionFound){
        req.session = sessionFound;
        req.session.refresh();
      }else{
        req.session = new Session();
        let cookie = new Cookie(options.cookie);
        await req.session.setCookie(res,cookie);
        req.session.expire = options.store.expire;
        req.session.save();
      }
    } catch (error) {
      console.log({sor:error});
      next(error);
    }
    next();
  };
}


