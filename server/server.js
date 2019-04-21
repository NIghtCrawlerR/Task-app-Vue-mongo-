const express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    MongoClient = require('mongodb').MongoClient,
    objectId = require("mongodb").ObjectID,
    cors = require('cors'),
    bodyParser = require('body-parser')


//Middleware
app.use(bodyParser.json())
app.use(cors())


const port = process.env.PORT || 5000;

const routes = require('./routes/api/routes')
app.use('/api/routes', routes);

app.listen(port, function () {
    console.log(`listening on *:${port}`);
});