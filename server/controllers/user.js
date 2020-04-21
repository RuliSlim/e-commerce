const { User }  = require('../models');
const uuid      = require('uuid/v4');
const jwt       = require('../helpers/jwt');

class UserController {
  static register (req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    User
      .create({id: uuid(), firstName, lastName, email, password})
      .then(user => {
        
      })
  }
}