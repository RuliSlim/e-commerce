/* eslint-disable no-undef */
const app  = require('../app.js');
const { User, sequelize } = require('../models');
const request = require('supertest');
const uuid = require('uuid/v4');
const { queryInterface } = sequelize;

describe('User routes', () => {
  const userData1 = {
    id: uuid(),
    firstName: 'namaPertama',
    lastName: 'akhirPertama',
    email: 'email1@email.com',
    password: 'password'
  };
  const userData2 = {
    id: uuid(),
    firstName: 'namaKedua',
    lastName: 'akhirKedua',
    email: 'email2@email.com',
    password: 'password'
  };

  beforeAll(done => {
    User
      .create(userData1)
      .then(() => done())
      .catch(err => done(err));
  });
  
  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .done(() => done())
      .catch(err => done(err));
  });

  describe('POST /register', () => {
    test('201 Succes Register - Should Create New User', done => {
      request(app)
        .post('/register')
        .send(userData2)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('access_token');
          done();
        })
        .catch(err => done(err));
    });

    test('400 Failed Register - Should Return Error If Email Taken', done => {
      request(app)
        .post('/register')
        .send(userData2)
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email already taken');
          done();
        })
        .catch(err => done(err));
    });

    test('400 Failed Register - Should Return Error If Email is empty', done => {
      request(app)
        .post('/register')
        .send({
          password: 'password',
          firstName: 'firstname',
          lastName: 'lastname'
        })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email cannot be empty');
          done();
        })
        .catch(err => done(err));
    });

    test('400 Failed Register - Should Return Error if firstname is empty', done => {
      request(app)
        .post('/register')
        .send({
          email: 'email3@email.com',
          password: 'password',
          lastName: 'lastname'
        })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'First Name cannot be empty');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /login', () => {
    test('200 Succes login - Should return acces_token', done => {
      request(app)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'password',
        })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token');
          done();
        })
        .catch(err => done(err));
    });

    test('400 Failed login - Should return error', done => {
      request(app)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'salah'
        })
        .then(response => {
          const { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'email or password does not match');
          done();
        })
        .catch(err => done(err));
    });
  });
});