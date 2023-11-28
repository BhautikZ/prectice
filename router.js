const express = require('express');
const RootRoutes = express.Router();
const nodemail = require("./model/nodemailer");
const userRoutes = require('./routers/user.router');
const addressRoutes=require('./routers/address.router');
const imagesRoutes=require('./routers/images.router');
const nodemailerhtml=require('./model/nodemailehtmlcontain');

RootRoutes.use(`/apis/users`, userRoutes);
RootRoutes.post("/sendmail",nodemail);
RootRoutes.post("/nodemailtemplate",nodemailerhtml);
RootRoutes.use(`/apis/address`,addressRoutes);
RootRoutes.use(`/apis/images`,imagesRoutes)


module.exports = RootRoutes;