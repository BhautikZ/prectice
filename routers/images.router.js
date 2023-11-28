const express = require('express');
const imagesRoutes =  express.Router();
const imagesController = require('../controller/image.controller');

imagesRoutes.use('/',imagesController);

module.exports = imagesRoutes;