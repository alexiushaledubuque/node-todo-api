// User model
const mongoose = require('mongoose')

const User = mongoose.model('User', { // 1st argument is string model name
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
})

module.exports = {
	User
}