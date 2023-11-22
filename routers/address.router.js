const express = require('express');
const addressRoutes =  express.Router();
const addressController = require('../controller/address.controller');

addressRoutes.use('/',addressController);

module.exports = addressRoutes;