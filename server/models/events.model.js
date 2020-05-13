const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: "User"},
    location: String,
    attendance: String,
    gameTime: Date,
    gameHour: Date,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true
})
const Event = mongoose.model('Evento', eventSchema)

module.exports = Event