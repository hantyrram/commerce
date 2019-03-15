/**
<<<<<<< HEAD
 * Used when a service operation succeeded and without warning.
 */
const SUCCESS = 'success';
/**
 * Used when a service operation failed.
 */
const ERROR = 'error';
/**
 * Used when a service operation succeeded but there is warning.
 */
const WARNING = 'warning';
/**
 * The message object used in creating Artifacts.
 */
class Message{
 constructor(type,text){
  if(!type || !text || ![ERROR,SUCCESS,WARNING].includes(type)){
   throw new Error('@Artifact.Message : Invalid message type or text');
  }
 }
}

Object.defineProperty(Message,'SUCCESS',{value: SUCCESS,writable:false,configurable:false});
Object.defineProperty(Message,'ERROR',{value: ERROR,writable:false,configurable:false});
Object.defineProperty(Message,'WARNING',{value: WARNING,writable:false,configurable:false});


/**
 * The object produced as a result of each service, which is sent to the client.
 */
class Artifact{
 /**
  * 
  * @param {string} status - REQUIRED!  The status of a particular operation value's can only be either 'ok' or 'nok'.
  * @param {string} source - REQUIRED! The name of the service which is the source of this Artifact.
  * @param {Artifact.Message} message - The message.
  * @param {object} data - The payload.
  */
 constructor(status,source,message,data){
  if(status !== 'ok' || status !== 'nok' || !source){
   throw new Error('@Artifact: Invalid Artifact Status or Source');
  }
  if(message && !(message instanceof Artifact.Message)){
   throw new Error('@Artifact: Invalid Message');
  }
  this.status = status;
  this.source = source;
  this.message = message;
  this.data = data;
 }
}

Object.defineProperty(Artifact,'Message',{value:Message,writable:false,configurable:false});
Object.defineProperty(Artifact,'OK',{value:'ok',writable:false,configurable:false});
Object.defineProperty(Artifact,'NOK',{value:'nok',writable:false,configurable:false});

module.exports = Artifact



=======
 * @typedef {Object} Artifact~error
 * @property {string} type - A string representing the specific error.
 * @property {string} message - The error message.
 */

/**
 * The standard object sent by a service as a response. All service sends artifact.
 * 
 * @constructor
 * 
 * @param {string} status - The status of the operation, values can only be either 'ok' or 'nok'. If value is 'ok' it
 * means the intended operation has succeed. If 'nok' the operation failed.
 * @param {string} source - The name of the service that generated this Artifact.
 * @param {Artifact~error | Object | null} third - If status = 'nok' then the third param should be a {@link Artifact~error}.
 * If status = 'ok', the service may provide some data as a result of completing the operation. E.g. a service that 
 * adds a particular entity may need to return the saved entity updated with ._id property to the client. This
 * can be done by putting the entity as a property of artifact.data (example: artifact.data = {entity: entityWithId}).
 * If status = 'nok' Artifact instance will have the error property, if status = 'ok' Artifact instance will have
 * the data property.
 *  @param {string} [message = ''] - An optional message.
 */
class Artifact{
 constructor(status,source,third,message = ''){
  if(!(status in ['ok','nok'])) throw new Error('Invalid status, values can only be either no or nok');
  if(typeof source !== 'string') throw new Error('Invalid source');
  if(typeof third !== 'object') throw new Error('Invalid data or error provided');
  if(status === 'nok'){
   //third must be an error
   if(!third['type']) throw new Error('Invalid error type');
   if(!third['message']) throw new Error('Invalid error message');
  }
  this.status = status;
  this.source = source;
  this[status === 'nok' ?'error':'data'] = third;
  this.message = message;
 }
}

module.exports = Artifact;
>>>>>>> ccd31ec1d8a649b6ee0f0632a95814e209c85b8f
