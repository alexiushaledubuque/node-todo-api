// Todo model
const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,		// mongoose validators
		minlength: 1,
		trim: true 	// removes leading or trailing white space
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
})

module.exports = {
	Todo
}