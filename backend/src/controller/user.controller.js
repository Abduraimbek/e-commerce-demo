const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendResponseError } = require('../middleware/middleware');
const { checkPassword, newToken } = require('../utils/utils');

const signUpUser = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);

    User.create(email, hash, fullName);
    res.status(201).send('Successfully account opened ');
    return;
  } catch (err) {
    console.log('Error: ', err);
    sendResponseError(500, `${e}`, res);
    return;
  }
};

const signInUser = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    const user = User.findByEmail(email);
    if (!!!user) {
      sendResponseError(400, 'You have to sign up first!', res);
    }

    const same = await checkPassword(password, user.password);
    if (same) {
      let token = newToken(user);
      res.status(200).send({ status: 'ok', token });
      return;
    }
    sendResponseError(400, 'Invalid password!', res);
  } catch (err) {
    console.log('Error: ', err);
    sendResponseError(500, `${e}`, res);
  }
};

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};

module.exports = { signUpUser, signInUser, getUser };
