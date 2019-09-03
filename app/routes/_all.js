// identifies the main route this must always be present

module.exports = {
   path : '*',
   method: 'all',
   middlewares : [
      'logger',
      // 'handleNonXHR',
      // 'expressStatic',
      // 'expressJson', //internal wrapper only
      // 'checkRoute',
      // 'checkService',
      // 'cookie-parser', //external
      // 'sessionOnRedis',
      // 'authentication',
      // 'authorization'
   ],
   // //middlewares configs
   // authentication: {
   //    loginURL: '/login'
   // },
   serviceProvider: '_main'

}