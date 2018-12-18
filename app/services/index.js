//A service MUST have a name, such that, getting the property service.name = the name of the service

const user = require('./user');
const store = require('./store');

module.exports = [].concat(user,store);