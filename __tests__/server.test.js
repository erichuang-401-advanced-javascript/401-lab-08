'use strict';

const server = require('../lib/server');
const supergoose = require('./supergoose');
const mockRequest = supergoose(server.app);

describe('the /products route should be able to CRUD it up', () => {
  
  test('create a new item', () => {
    let test = {
      name : 'test1',
      price : 0,
      cool : false,
    };
    mockRequest.post('/products')
      .send( test )
      .then( response => {
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('test');
      });
  });

  test('get all items', () => {
    let test = {
      name : 'test2',
      price : 0,
      cool : true,
    };
    mockRequest.post('/products')
      .send( test );
    mockRequest.get('/products')
      .send( {} )
      .then( response => {
        expect(response.status).toEqual(200);
        expect(response.body.results.length).toEqual(2);
      });
  });

  test('update an item', () => {
    let test = {
      price : 10,
    };
    mockRequest.get('/products')
      .send( {} )
      .then( response => {
        let id = response.body.results[0]._id;
        mockRequest.update(`/products/update?${id}`)
          .send( test )
          .then( response => {
            expect(response.status).toEqual(201);
            expect(response.body.results[0].price).toEqual(10);
          });
      });
  });

  test('delete an item', () => {
    mockRequest.get('/products')
      .send( {} )
      .then( response => {
        let id = response.body.results[0]._id;
        mockRequest.delete(`/products/delete?${id}`)
          .then( response => {
            console.log(response);
            expect(response.status).toEqual();
          });
      });
  });
});
