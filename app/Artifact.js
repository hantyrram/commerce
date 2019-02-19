/**
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



