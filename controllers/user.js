const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send( user );
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        throw new ConflictError('This email is already registered');
      } else if(err.name === 'ValidationError'){
        throw new BadRequestError('Incorrect data');
      }
      throw err;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send({ token });
    })
    .catch(() =>
      next(new UnAuthorizedError('Invalid password or email')))
};

const returnUser = (req, res, next) => {
  const requestedId = req.user._id;
  User.findById(requestedId)
    .orFail()
    .then((user) => { res.send(user); })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new BadRequestError('Data update error');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Data update error'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('This email is already registered'));
      } else {
        next(err);
      }
    });
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Signed out of your account' });
};

module.exports = {
  returnUser, updateUser, login, createUser, signOut,
};
