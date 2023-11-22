require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RootRoutes = require('./router');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(
    cors({
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: '*'
    })
);
app.use(RootRoutes);
app.use("/public", express.static("public"));
app.use(express.json())
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("Server is running on : " + process.env.PROTOCOL + "://" + process.env.HOST + ":" + process.env.PORT);
})