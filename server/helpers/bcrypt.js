const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = 10;
  const saltgen = bcrypt.genSaltSync(salt);
  return bcrypt.hashSync(password, saltgen);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hashPassword, comparePassword
};
