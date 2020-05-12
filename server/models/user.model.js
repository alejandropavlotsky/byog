const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: String,
        password: String,
        userImage: String,
        favorites: [{ type: Schema.Types.ObjectId, ref: "Juegos"}]
	},
	{
		timestamps: true
	}
)
const User = mongoose.model('User', userSchema)

module.exports = User
