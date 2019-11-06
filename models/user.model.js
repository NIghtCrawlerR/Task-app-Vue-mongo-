const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the user Schema
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cards: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        require: Date.now
    },
})

module.exports = User = mongoose.model('users', UserSchema)