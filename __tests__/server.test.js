'use strict';

const server = require('../lib/server');
const supergoose = require('./supergoose');
const mockRequest = supergoose(server.app);

describe('both /products and /categories routes should be able to CRUD it up', () => {

  let models = [ 'products', 'categories' ];

  models.forEach( model => {

    test('create a new item', () => {

      let bank = [{
        name : 'test1',
        price : 0,
        cool : false,
      }, {
        name : 'asdf1',
        type : 'qwer',
        rating : 5,
      }];

      let test;

      if ( model === 'products' ) test = bank[0];
      else test = bank[1];

      return mockRequest.post(`/${model}`)
        .send( test )
        .then( response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(test.name);
        });
    });
  
    test('get all items', () => {

      let bank = [{
        name : 'test2',
        price : 0,
        cool : true,
      },{
        name : 'asdf2',
        type : 'poot',
        rating : 10,
      }];

      let test;

      if ( model === 'products' ) test = bank[0];
      else test = bank[1];

      return mockRequest.post(`/${model}`)
        .send( test )
        .then (response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(test.name);
        })
        .then( () => {
          return mockRequest.get(`/${model}`)
            .send( {} )
            .then( response => {
              expect(response.body.count).toEqual(2);
            });
        });
    });
  
    test('update an item', () => {

      let bank = [{
        price : 10,
      }, {
        rating : 100,
      }];

      let test;

      if ( model === 'products' ) test = bank[0];
      else test = bank[1];

      return mockRequest.get(`/${model}`)
        .send( {} )
        .then( response => {
          let id = response.body.results[0]._id;
          return mockRequest.put(`/${model}/update?id=${id}`)
            .send( test )
            .then( response => {
              expect(response.status).toEqual(200);
              expect(response.body.price).toEqual(test.price);
            });
        })
        .then( () => {
          return mockRequest.get(`/${model}`)
            .send( {} )
            .then( response => {
              expect(response.body.results[0].price).toEqual(test.price);
            });
        });
    });
  
    test('delete an item', () => {

      let bank = [{
        name : 'deleeteemeee',
        price : 10,
        cool : false,
      }, {
        name : 'deleteme',
        type : 'asdf',
        rating: 50,
      }];

      let test;

      if ( model === 'products' ) test = bank[0];
      else test = bank[1];

      return mockRequest.post(`/${model}`)
        .send( test )
        .then( response => {
          let id = response.body._id;
          return mockRequest.put(`/${model}/delete?id=${id}`)
            .then( () => {
              return mockRequest.get(`/${model}`)
                .send(id)
                .then( response => {
                  response.body.results.forEach( obj => {
                    expect(obj._id === id).toEqual(false);
                  });
                });
            });
        });
    });
  });
});

describe('Error checks on routes work', () => {

  test('500 errors on POST', () => {

    let testbank = { 
      test1 : { name : 'asdf' },
      test2 : { name : 'asdf', price : 50 },
      test3 : { name : 'asdf', price : 50, cool : 'oops' },
    };

    Object.keys(testbank).forEach( test => {
      return mockRequest.post('/products')
        .send( test )
        .then( response => {
          expect(response.status).toEqual(500);
        });
    });
  });

});
