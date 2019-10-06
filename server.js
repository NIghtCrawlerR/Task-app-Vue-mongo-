const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    mongodb = require('mongodb'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 5000,
    mongoose = require('mongoose')


//Middleware
app.use(bodyParser.json())
app.use(cors())

//mongo db connect
var dbUrl = process.env.DB_URI

mongoose.connect(dbUrl, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
    console.log('MongoDB successfully connected')
})

const routes = require('./routes/api/routes')
app.use('/api/routes', routes);

app.use(express.static(path.join(__dirname, "client", "dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});