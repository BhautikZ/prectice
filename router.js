const express = require('express');
const RootRoutes = express.Router();
const userRoutes = require('./routers/user.router');
const addressRoutes=require('./routers/address.router');

RootRoutes.use(`/apis/users`, userRoutes);
RootRoutes.use(`/apis/address`,addressRoutes)

module.exports = RootRoutes;