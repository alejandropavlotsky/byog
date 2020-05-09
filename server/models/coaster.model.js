const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    title: String,
    description: String,
    inversions: Number,
    length: Number,
    imageUrl: String
}, {
    timestamps: true
})

const Coaster = mongoose.model('coaster', coasterSchema)
module.exports = Coaster