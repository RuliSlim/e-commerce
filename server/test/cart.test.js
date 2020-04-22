/* eslint-disable no-undef */
const app                 = require('../app.js');
const request             = require('supertest');
const uuid                = require('uuid/v4');
const { sequelize, Product }       = require('../models');
const { queryInterface }  = sequelize;

describe('Cart routes', () => {
  const userData1 = {
    id: uuid(),
    name: 'namaPertama',
    email: 'email15@email.com',
    password: 'password',
    token: null
  };
  const product1 = {
    id: 1005,
    name: 'Product',
    image: 'images/',
    price: 245,
    stock: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  let CartId = null;

  beforeAll(done => {
    request(app)
      .post('/register')
      .send(userData1)
      .then(response => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('access_token');
        userData1.token = response.body.access_token;
        return Product.create(product1);
      })
      .then(() => done())
      .catch(err => done(err));
  });

  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => queryInterface.bulkDelete('Products', {}))
      .done(() => done())
      .catch(err => done(err));
  });

  describe('POST /carts', () => {
    test('201 Succes add to cart - should create new cart', done => {
      request(app)
        .post('/carts')
        .set('access_token', userData1.token)
        .send({ ProductId: 1, amount: 5 })
        .then(response => {
          const { status, body } = response;
          CartId = response.body.id;
          expect(status).toBe(201);
          expect(body).toHaveProperty('amount');
          expect(body).toHaveProperty('ProductId');
          expect(body).toHaveProperty('UserId');
          done();
        })
        .catch(err => done(err));
    });

    test('401 Failed add to cart - should have access_token', done => {
      request(app)
        .post('/carts')
        .send({ ProductId: 1, amount: 5 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /cart', () => {
    test('200 Succes get all carts - should get all carts', done => {
      request(app)
        .get('/carts')
        .set('access_token', userData1.token)
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({amount: expect.any(Number)});
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('PUT /:id', () => {
    test('200 Success update cart - should update cart', done => {
      request(app)
        .put('/carts/' + CartId)
        .set('access_token', userData1.token)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({amount: expect.any(Number)});
          // expect(body).toHaveProperty('ProductId');
          // expect(body).toHaveProperty('UserId');
          done();
        })
        .catch(err => done(err));
    });

    test('404 Failed update cart - should not update cart', done => {
      request(app)
        .put('/carts/-1')
        .set('access_token', userData1.token)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Cart not found');
          done();
        })
        .catch(err => done(err));
    });

    test('401 Failed update cart - should not update cart', done => {
      request(app)
        .put('/carts/' + CartId)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'jwt must be provided');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /checkout', () => {
    test('200 Success checkout cart - should checkout cart', done => {
      request(app)
        .post('/carts/checkout')
        .set('access_token', userData1.token)
        .send({cart: [CartId, 1005]})
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Successfully checkout');
          done();
        })
        .catch(err => done(err));
    });

    // test('404 Failed checkout cart - should not checkout cart', done => {
    //   request(app)
    //     .post('/carts/checkout')
    //     .set('access_token', userData1.token)
    //     .then(response => {
    //       const { status, body } = response;
    //       expect(status).toBe(404);
    //       expect(body).toHaveProperty('message', 'Cart not found');
    //       done();
    //     })
    //     .catch(err => done(err));
    // });

    // test('401 Failed checkout cart - should not checkout cart', done => {
    //   request(app)
    //     .post('/carts/-1/checkout')
    //     .then(response => {
    //       const { status, body } = response;
    //       expect(status).toBe(401);
    //       expect(body).toHaveProperty('message', 'jwt malformed');
    //       done();
    //     })
    //     .catch(err => done(err));
    // });
  });

  describe('DELETE /:id', () => {
    test('404 Failed delete cart - should not delete cart', done => {
      request(app)
        .delete('/carts/-1')
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Cart not found');
          done();
        })
        .catch(err => done(err));
    });

    test('401 Failed delete cart - should not delete cart', done => {
      request(app)
        .delete('/carts/' + CartId)
        .set('access_token', 'token')
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'jwt malformed');
          done();
        })
        .catch(err => done(err));
    });

    test('200 Success delete cart - should delete cart', done => {
      request(app)
        .delete('/carts/' + CartId)
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Successfully delete cart');
          done();
        })
        .catch(err => done(err));
    });
  });
});