/* eslint-disable no-undef */
const app  = require('../app.js');
const { Product, sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;

describe('Product routes', () => {
  let productData = {
    name: 'name',
    image: 'image url',
    price: 25000,
    stock: 10,
    id: null,
  };

  beforeAll(done => {
    Product
      .create(productData)
      .then((product) => {
        productData.id = product.id;
        done();
      })
      .catch(err => done(err));
  });

  afterAll(done => {
    queryInterface
      .bulkDelete('Products', {})
      .done(() => done())
      .catch(err => done(err));
  });

  describe('GET /products', () => {
    test('200 Success get products - Should return products list', done => {
      request(app)
        .get('/products')
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: expect.any(Number)});
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /products/:id', () => {
    test('200 Success get one product - Should return products detail', done => {
      request(app)
        .get('/products/' + productData.id)
        .then(response => {
          const { status } = response;
          expect(status).toBe(200);
          expect.objectContaining({id: expect.any(Number)});
          done();
        })
        .catch(err => done(err));
    });

    test('404 Failed get one product - Should return products detail', done => {
      request(app)
        .get('/products/-1')
        .then(response => {
          const { status } = response;
          expect(status).toBe(404);
          expect.objectContaining({id: expect.any(Number)});
          done();
        })
        .catch(err => done(err));
    });
  });
});