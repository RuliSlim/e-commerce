const app  = require('../app.js');
const { User, sequelize } = require('../models');
const request = require('supertest');
const uuid = require('uuid/v4');
const { queryInterface } = sequelize;

describe('User routes', () => {
  const userData1 = {
    firstName: 'namaPertama',
    lastName: 'akhirPertama',
    email: 'email1@email.com',
    password: 'password'
  }
  const userData2 = {
    firstName: 'namaKedua',
    lastName: 'akhirKedua',
    email: 'email2@email.com',
    password: 'password'
  }

  
})