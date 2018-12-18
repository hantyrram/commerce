class _4xx{
  constructor(code=400,type='UNSPECIFIED',message='Bad Request',error){
    this.code = code ;
    this.type = type ;
    this.message = message;
    error ? this.error = error: null;
  }
}

module.exports = _4xx;