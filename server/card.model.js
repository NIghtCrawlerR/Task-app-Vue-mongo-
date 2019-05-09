const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Card = new Schema({
    title: {
        type: String
    },
    descr: {
        type: String
    },
    taskGroups: {
        type: Array
    }
})

module.exports = mongoose.model('Card', Card)