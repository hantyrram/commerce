/**
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