const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: String,
        password: String,
		userImage: {
			type: String,
			default: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg"
		},
        favorites: [{ type: Schema.Types.ObjectId, ref: "Juegos"}]
	},
	{
		timestamps: true
	}
)
const User = mongoose.model('User', userSchema)

module.exports = User
