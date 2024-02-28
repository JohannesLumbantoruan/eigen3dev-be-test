const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];

  try {
    const member = jwt.verify(token, process.env.JWT_SECRET);

    req.member = member;

    next();
  } catch (error) {
    const err = new Error('Invalid token!');
    err.code = 401;

    throw err;
  }
};

module.exports = authenticate;