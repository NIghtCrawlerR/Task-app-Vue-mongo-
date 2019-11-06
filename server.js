const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config()
}

const express = require('express'),
    path = require('path'),
    serveStatic = require("serve-static"),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    passport = require('passport')


//Init app
const app = express();

//Middleware
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use(cors())

//mongo db connect
var dbUrl = process.env.DB_URI

mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch(err => console.log(`Unable to connect database. Error: ${err}`))

app.use(require('./routes/index'))

app.use(express.static(path.join(__dirname, "client/dist")))
// app.use(serveStatic(path.join(__dirname, 'client/dist')));

app.use(passport.initialize())

require('./config/passport')(passport)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});