/* eslint-disable no-undef */
const app             = require('../app.js');
const request         = require('supertest');
const uuid            = require('uuid/v4');

describe('Cart routes', () => {
  const userData1 = {
    id: uuid(),
    name: 'namaPertama',
    email: 'email10@email.com',
    password: 'password',
    token: null
  };

  let id = null;

  beforeAll(done => {
    request(app)
      .post('/register')
      .send(userData1)
      .then(response => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('access_token');
        userData1.token = response.body.access_token;
        done();
      })
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
          id = response.id;
          expect(status).toBe(200);
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
        .post('/carts')
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
        .put('/cart/' + id)
        .set('access_token', userData1.token)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('amount');
          expect(body).toHaveProperty('ProductId');
          expect(body).toHaveProperty('UserId');
          done();
        })
        .catch(err => done(err));
    });

    test('404 Failed update cart - should not update cart', done => {
      request(app)
        .put('/cart/-1')
        .set('access_token', userData1.token)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Cart not found');
          done();
        })
        .catch(err => done(err));
    });

    test('401 Failed update cart - should not update cart', done => {
      request(app)
        .put('/cart/' + id)
        .send({ ProductId: 1, amount: 10 })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Cart not found');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /:id/checkout', () => {
    test('200 Success checkout cart - should checkout cart', done => {
      request(app)
        .post('/cart/' + id + '/checkout')
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Successfully checkout');
          done();
        })
        .catch(err => done(err));
    });

    test('404 Failed checkout cart - should not checkout cart', done => {
      request(app)
        .post('/cart/-1/checkout')
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Cart not found');
          done();
        })
        .catch(err => done(err));
    });

    test('401 Failed checkout cart - should not checkout cart', done => {
      request(app)
        .post('/cart/-1/checkout')
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Acces denied');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE /:id', () => {
    test('200 Success delete cart - should delete cart', done => {
      request(app)
        .delete('/cart/' + id)
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('message', 'Successfully delete cart');
          done();
        })
        .catch(err => done(err));
    });

    test('404 Failed delete cart - should not delete cart', done => {
      request(app)
        .delete('/cart/-1')
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
        .delete('/cart/' + id)
        .set('access_token', userData1.token)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Acces denied');
          done();
        })
        .catch(err => done(err));
    });
  });
});