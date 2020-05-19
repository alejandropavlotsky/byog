const mongoose = require('mongoose')
const Schema = mongoose.Schema
const utils = require('../utils/gameDificultyOptions')

const gameSchema = new Schema({
    title: String,
    description: String,
    author: String,
    gameImg: String,
    theme: String,
    ageRange: String,
    numOfPlayers: String,
    gameTime: String,
    difficulty: {
        type: String,
        enum: utils.map(elm => elm.label)
    },
    price: String,
    language: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
})
const Games = mongoose.model('Juegos', gameSchema)

module.exports = Games