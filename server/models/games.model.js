const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        enum: ["Facil", "Medio", "Dificil", "Muy Dificil"],
    },
    price: String,
    language: String,
    owner: { type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
})
const Games = mongoose.model('Juegos', gameSchema)

module.exports = Games