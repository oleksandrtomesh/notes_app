const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
    title: {type: String},
    body: {type: String},
    id: {type: Number, required: true, unique: true},
    timeStamp: {type: String, required: true},
})

module.exports = model('Note', noteSchema)