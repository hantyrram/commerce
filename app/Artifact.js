/**
 * Used when a service operation succeeded and without warning.
 * @memberof Artifact.ArtifactMessage
 * @static
 * @const
 */
const SUCCESS = 'success';
/**
 * Used when a service operation failed.
 * @memberof Artifact.ArtifactMessage
 * @static
 * @const
 */
const ERROR = 'error';

/**
 * Used when a service operation succeeded but there is warning.
 * @memberof Artifact.ArtifactMessage
 * @static
 * @const
 */
const WARNING = 'warning';
/**
 * The message object used in creating Artifacts.
 * @memberof Artifact
 * @static
 * 
 */
class ArtifactMessage{
 constructor(type,text){
  if(!type || !text || ![ERROR,SUCCESS,WARNING].includes(type)){
   throw new Error('@Artifact.Message : Invalid message type or text');
  }
 }
}

/**
 * The Artifact Error object used in creating Artifacts.
 * @memberof Artifact
 * @static
 * 
 */
class ArtifactError{
 constructor(type,text){
  if(!type || !text){
   throw new Error('@Artifact.Error : Invalid type or text');
  }
 }
}

Object.defineProperty(ArtifactMessage,'SUCCESS',{value: SUCCESS,writable:false,configurable:false});
Object.defineProperty(ArtifactMessage,'ERROR',{value: ERROR,writable:false,configurable:false});
Object.defineProperty(ArtifactMessage,'WARNING',{value: WARNING,writable:false,configurable:false});

/**
 * @inner 
 * @enum
 */
const STATUS = {
 ok : 'ok',
 nok: 'nok'
}

/*
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
  if(!(status in STATUS)) throw new Error('Invalid status, values can only be either ok or nok');
  if(typeof source !== 'string') throw new Error('Invalid source');
  if(typeof third !== 'object') throw new Error('Invalid data or error provided');
  if(status === 'nok'){
   //third MUST be an Artifact~error
  if( !(third instanceof ArtifactError))
   //allow if third has the same prototype as ArtifactError
   if(!third['type'] || !third['message']){
    throw new Error('Invalid third parameter. MUST be of type ArtifactError');
   }
   
  }
  this.status = status;
  this.source = source;
  this[status === 'nok' ?'error':'data'] = third;
  this.message = message;
 }
}

Object.defineProperty(Artifact,'ArtifactMessage',{value:ArtifactMessage,writable:false,configurable:false});
Object.defineProperty(Artifact,'ArtifactError',{value:ArtifactError,writable:false,configurable:false});
Object.defineProperty(Artifact,'OK',{value:'ok',writable:false,configurable:false});
Object.defineProperty(Artifact,'NOK',{value:'nok',writable:false,configurable:false});

module.exports = Artifact;
