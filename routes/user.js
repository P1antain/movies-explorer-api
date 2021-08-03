const express = require('express');

const usersRoute = express.Router();
const { updateUser, returnUser } = require('../controllers/user');
const { userDataValidation } = require('../middlewares/validation');

usersRoute.get('/me', returnUser);

usersRoute.patch('/me', userDataValidation, updateUser);

module.exports = usersRoute;
