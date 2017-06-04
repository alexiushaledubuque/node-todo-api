// User model
const mongoose = require('mongoose')

// 1st argument is string model name
const User = mongoose.model('User', { 
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