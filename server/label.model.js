const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Label = new Schema({
    title: {
        type: String
    },
    color: {
        type: String
    }
})

module.exports = mongoose.model('Label', Label, 'labels')