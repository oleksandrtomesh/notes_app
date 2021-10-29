const {Schema, model, Types} = require('mongoose')

const noteSchema = new Schema({
    title: {type: String},
    body: {type: String},
    timeStamp: {type: String, required: true, unique: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Note', noteSchema)