const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT } = require('../config/config');

const checkPassword = (password, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        reject(err);
      }

      resolve(same);
    });
  });
};

const newToken = (user) => {
  return jwt.sign({ id: user.id }, JWT.jwt, { expiresIn: JWT.jwtExp });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const readDatabase = () => {
  const dir = path.join(__dirname, 'database.json');
  const data = fs.readFileSync(dir, 'utf8');
  const obj = JSON.parse(data);
  return obj;
};

const writeDatabase = (content) => {
  const dir = path.join(__dirname, 'database.json');
  fs.writeFileSync(dir, JSON.stringify(content));
};

module.exports = {
  checkPassword,
  newToken,
  verifyToken,
  readDatabase,
  writeDatabase,
};
