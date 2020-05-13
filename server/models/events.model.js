const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const eventSchema = new Schema({
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: "User"},
    location: String,
    attendance: Number,
    assistance: [{ type: Schema.Types.ObjectId, ref: "User" }],
    gameDate: Date,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true
})
const Event = mongoose.model('Evento', eventSchema)

module.exports = Event