const JWT = {
  jwt: process.env.JWT_SECRET || '234-1523-234-255-234',
  jwtExp: '100d',
};

module.exports = { JWT };
