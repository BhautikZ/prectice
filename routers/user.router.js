const express = require('express');
const userRoutes =  express.Router();
const UserController = require('../controller/user.controller');

userRoutes.use('/',UserController);

module.exports = userRoutes;


