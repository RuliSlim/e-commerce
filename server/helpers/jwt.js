const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

class JWT {
  static signToken(user) {
    return jwt.sign(
      {
        id: user.id,
        iss: 'ServerClient',
        iat: new Date().getTime(),
      }, secret, { expiresIn: '24h'});
  }

  static decodeToken(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = JWT;