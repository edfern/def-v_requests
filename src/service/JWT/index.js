const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const generateAccessToken = (username) => {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: '300s',
  });
};

const verifyAccessToken = (token) => {
  const user = jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return;
    }
    return user;
  });

  return user;
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    let bearer = bearerHeader.split(' ');
    let bearerToken = bearer[1];
    req.token = bearerToken;

    if (verifyAccessToken(bearerToken)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
