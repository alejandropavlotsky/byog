const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedInEvent: {type: Schema.Types.ObjectId, ref: "Evento" },
    reviewedInGame: {type: Schema.Types.ObjectId, ref: "Juegos" }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review