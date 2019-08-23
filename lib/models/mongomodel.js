'use strict';

class Model {

  constructor( schema ){
    this.schema = schema;
  }

  
  /**
   * creates a record given a record
   *
   * @param {*} record
   * @returns
   * @memberof Model
   */
  create( record ){
    let newRecord = new this.schema( record ); 
    return newRecord.save();
  }

  
  /**
   * gets a record or all records
   *
   * @param {*} id
   * @returns
   * @memberof Model
   */
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

  
  /**
   * updates a record
   *
   * @param {*} id
   * @param {*} update
   * @returns
   * @memberof Model
   */
  update( id, update ){
    
    if( id ){
      return this.schema.findByIdAndUpdate( id, update, { new : true } );
    } else {
      return 'UPDATE FAIL: Invalid ID.';
    }
  }

  /**
   * deletes a record
   *
   * @param {*} id
   * @returns
   * @memberof Model
   */
  delete( id ){

    if( id ){
      return this.schema.findByIdAndDelete( id );
    } else return 'DELETE FAIL: Invalid ID.';
  }

}

module.exports = Model;