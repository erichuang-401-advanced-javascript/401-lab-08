'use strict';

class Model {

  constructor( schema ){
    this.schema = schema;
  }

  //create
  create( record ){
    let newRecord = new this.schema( record ); 
    return newRecord.save();
  }

  //read
  get( id ){

    if( id ){
      return this.schema.findById( id );
    } else {
      return this.schema.find( {} )
        .then( results => {
          return {
            count : results.length,
            results : results,
          };
        });
    }

  }

  //update
  update( id, update ){
    
    if( id ){
      return this.schema.findByIdAndUpdate( id, update, { new : true } );
    } else {
      return 'UPDATE FAIL: Invalid ID.';
    }
  }

  //delete
  delete( id ){

    if( id ){
      return this.schema.findByIdAndDelete( id );
    } else return 'DELETE FAIL: Invalid ID.';
  }

}

module.exports = Model;