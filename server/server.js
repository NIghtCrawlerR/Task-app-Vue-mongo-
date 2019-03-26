const express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    MongoClient = require('mongodb').MongoClient,
    objectId = require("mongodb").ObjectID

const port = process.env.PORT || 5000;

const routes = require('./routes/routes')
app.use('/', routes);

app.listen(port, function () {
    console.log(`listening on *:${port}`);
});